import { openDatabase, enablePromise } from "expo-sqlite";
import * as queries from "./queries";
import { defaultImageUri, generatePlantImageFileName } from "../constants/plantTemplates";
import { getFileExtension, generatePlantImageUri, savePlantImage, resetFileSystem } from "../filesystem/filesystem";
import { addDays } from "../helpers/dateTimeHelper";

// increment to update db structure and reset data 
const db_version = 20;

let db = undefined;

const connected = () => {
    if (db == undefined) {
        return false;
    }
    return true;
}

const connect = () => {
    db = openDatabase('plant-care.db');
}

const transaction = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            resolve(tx)
        });
    });
}

const execSQL = async (query, args) => {
    if (!connected()) connect();

    let tx = await transaction();
    return new Promise((resolve, reject) => {
        tx.executeSql(query, args, (txObj, result) => { resolve(result) }, (txObj, error) => { reject(error) });
    });
}


const recreateDB = async () => {
    await resetFileSystem();
    await dropSchema();
    await createSchema();
    await populateData();
}

const init = () => {
    handleDb();
}

// sprawdza czy zmieniła się wersja bazy danych (db_version) i w razie potrzeby tworzy ją na nowo
const handleDb = async () => {
    try {
        await execSQL(queries.createDBInfoTable, null);
        const result = await execSQL(queries.getLastDbVersion, null);
        console.log(result.rows._array);
        if (result.rows._array.length == 0) {
            await execSQL(queries.insertDBVersion, [db_version]);
            await recreateDB();
        }
        else if (result.rows._array[0]['last_db_version'] != db_version) {
            await execSQL(queries.updateDBVersion, [db_version]);
            await recreateDB();
        }
    } catch (error) {
        console.log(error);
    }
}

const dropSchema = async () => {
    try {
        await execSQL(queries.dropWateringTrigger, null);
        await execSQL(queries.dropPlantsTable, null);
        await execSQL(queries.dropWateringTable, null);
    } catch (error) {
        console.log(error);
    }
}

const createSchema = async () => {
    try {
        await execSQL(queries.createPlantsTable, null);
        await execSQL(queries.createWateringTable, null);
        await execSQL(queries.createWateringTrigger, null);
    } catch (error) {
        console.log(error);
    }

}

let plants = [
    {
        name: 'Kaktus w pokoju',
        species: 'Aporocactus Mallisonii',
        description: 'Uwaga, kłujący!',
        image: defaultImageUri,
        wateringdays: 1
    },
    {
        name: 'Mięta w kuchni',
        species: 'Mięta pieprzowa',
        description: 'pięknie pachnie',
        image: defaultImageUri,
        wateringdays: 10
    },
    {
        name: 'Rozmaryn na balkonie',
        species: 'Rozmaryn zwycznajny',
        description: 'Moja ulubiona roślina',
        image: defaultImageUri,
        wateringdays: 3
    },
    {
        name: 'Łany burzanu',
        species: 'Mięta pieprzowa',
        description: 'podlewać raz dziennie',
        image: defaultImageUri,
        wateringdays: 4
    },
]

const populateData = async () => {
    for (let i = 0; i < plants.length; i++) {
        try {
            await execSQL(queries.insertPlant, [plants[i].name, plants[i].species, plants[i].description, plants[i].image, plants[i].wateringdays]);
        } catch (error) {
            console.log(error);
        }
    }

    const now = Date.now();
    await waterPlant(1, now);
    await waterPlant(2, addDays(now, -10));
    await waterPlant(3, addDays(now, -4));
    await waterPlant(4, addDays(now, -10));
}

const getPlants = async () => {
    try {
        const result = await execSQL(queries.selectPlants, null);
        return result.rows._array;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

const getPlant = async (id) => {
    try {
        const result = await execSQL(queries.selectPlant, [id]);
        return result.rows._array[0];
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const addPlant = async (plant) => {

    try {
        const result = await execSQL(queries.insertPlant, [plant.name, plant.species, plant.description, plant.image, plant.wateringdays]);
        const imageUri = generatePlantImageUri(generatePlantImageFileName(result.insertId) + getFileExtension(plant.image));
        const saved = await savePlantImage(plant.image, imageUri);
        if (saved) {
            plant.image = imageUri;
        }
        else {
            plant.image = defaultImageUri;
        }

        plant.id = result.insertId;
        await execSQL(queries.updatePlant, [plant.name, plant.species, plant.description, plant.image, plant.wateringdays, plant.id]);
        return result.insertId;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const removePlant = async (id) => {
    try {
        const result = await execSQL(queries.deletePlant, [id]);
        console.log(result);
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const modifyPlant = async (plant) => {
    try {
        const imageUri = generatePlantImageUri(generatePlantImageFileName(plant.id) + getFileExtension(plant.image));
        const saved = await savePlantImage(plant.image, imageUri);
        if (saved) {
            plant.image = imageUri;
        }
        else {
            plant.image = defaultImageUri;
        }
        const result = await execSQL(queries.updatePlant, [plant.name, plant.species, plant.description, plant.image, plant.wateringdays, plant.id]);
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const waterPlant = async (id, timestamp) => {
    try {
        const result = await execSQL(queries.insertWatering, [id, timestamp]);
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const waterPlantNow = async (id) => {
    const timestamp = Date.now();
    return await waterPlant(id, timestamp);
}

const getWateringForPlant = async (id) => {

    try {
        const result = await execSQL(queries.selectWateringForPlant, [id]);
        console.log(result);
        return result.rows._array;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const plantsCRUD = { getPlants, getPlant, addPlant, removePlant, modifyPlant, waterPlant, waterPlantNow, getWateringForPlant };
const dbManagement = { init };

export { plantsCRUD, dbManagement }
