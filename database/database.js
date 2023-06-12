import { openDatabase, enablePromise } from "expo-sqlite";
import * as queries from "./queries";

// increment to update db structure and reset data 
const db_version = 4;

let db = undefined;

const connected = () => {
    if(db == undefined){
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
    if(!connected()) connect();

    let tx = await transaction();
    return new Promise((resolve, reject) => {
        tx.executeSql(query, args, (txObj, result) => { resolve(result) }, (txObj, error) => { reject(error) });
    });
}


const recreateDB = async () => {
    dropSchema()
        .then(createSchema()
                .then(populateData((data, error) => {
                    if(error) console.log(error);
                }))
                .catch(error => console.log(error)))
        .catch(error => console.log(error));
}

const init = () => {
    handleDb();
}

// sprawdza czy zmieniła się wersja bazy danych (db_version) i w razie potrzeby tworzy ją na nowo
const handleDb = async () => {
    execSQL(queries.createDBInfoTable, null)
        .then(execSQL(queries.getLastDbVersion, null)
                .then(data => { console.log(data.rows._array);
                                if(data.rows._array.length == 0)
                                    execSQL(queries.insertDBVersion, [db_version]).then(recreateDB().catch(error => console.log(error))).catch(error => console.log(error));
                                else if(data.rows._array[0]['last_db_version'] != db_version)
                                    execSQL(queries.updateDBVersion, [db_version]).then(recreateDB().catch(error => console.log(error))).catch(error => console.log(error));
                                    
                                
                })
                .catch(error => console.log(error)))
        .catch(error => console.log(error));
}

const dropSchema = async () => {
    if(!connected()) connect();
    let tx = await transaction();
    return new Promise((resolve, reject) => {
        tx.executeSql(queries.dropPlantsTable, null, (txObj, result) => { resolve(result) }, (txObj, error) => { reject(error) });
    });
}

const createSchema = async () => {
    if(!connected()) connect();
    let tx = await transaction();
    return new Promise((resolve, reject) => {
        tx.executeSql(queries.createPlantsTable, null, (txObj, result) => { resolve(result) }, (txObj, error) => { reject(error) });
    });
}

let plants = [
    {
        id: 0,
        name: 'Kaktus w pokoju',
        species: 'Aporocactus Mallisonii',
        description: 'podlewać dwa razy w tygodniu',
    },
    {
        id: 1,
        name: 'Mięta w kuchni',
        species: 'Mięta pieprzowa',
        description: 'podlewać raz dziennie',
    }
]

const populateData = (callback) => {
    if(!connected()) connect();
    for(let i = 0; i <  plants.length; i++){
        db.transaction(tx => {
            tx.executeSql(queries.insertPlant, [plants[i].name, plants[i].species, plants[i].description], (txObj, result) => {callback(result, null)}, (txObj, error) => {callback(null, error) });
        });
    }
}

const getPlants = async () => {
    try{
        const result = await execSQL(queries.selectPlants, null);
        return result.rows._array;
    }
    catch (error){
        console.log(error);
        return [];
    }
}

const getPlant = async (id) => {
    try{
        const result = await execSQL(queries.selectPlant, [id]);
        return result.rows._array[0];
    }
    catch (error){
        console.log(error);
        return null;
    }
}

const addPlant = async (plant) => {
    try{
        const result = await execSQL(queries.insertPlant, [plant.name, plant.species, plant.description]);
        return result.insertId;
    }
    catch (error){
        console.log(error);
        return null;
    }
}

const removePlant = async (id) => {
    try{
        const result = await execSQL(queries.deletePlant, [id]);
        console.log(result);
        return result;
    }
    catch (error){
        console.log(error);
        return null;
    }
}

const modifyPlant = async (plant) => {
    try{
        const result = await execSQL(queries.updatePlant, [plant.name, plant.species, plant.description, plant.id]);
        return result;
    }
    catch (error){
        console.log(error);
        return null;
    }
}

const plantsCRUD = { getPlants, getPlant, addPlant, removePlant, modifyPlant };
const dbManagement = { init };

export { plantsCRUD, dbManagement }