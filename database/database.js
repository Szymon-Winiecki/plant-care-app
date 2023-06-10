let plants = [
    {
        id: 0,
        name: 'Kaktus w pokoju',
        species: 'Aporocactus Mallisonii',
        watering: 'dwa razy w tygodniu',
    },
    {
        id: 1,
        name: 'Mięta w kuchni',
        species: 'Mięta pieprzowa',
        watering: 'raz dziennie',
    },
]

const getPlants = () => {
    return plants;
}

const getPlant = (id) => {
    const filtered = plants.filter(plant => plant.id == id);
    if(filtered.length == 0){
        return null;
    }
    else{
        return filtered[0];
    }
}

const addPlant = (plant) => {
    const id = plants[plants.length-1].id + 1
    plant.id = id;
    plants = [...plants, plant];
}

const removePlant = (id) => {
    const no = plants.indexOf(plant => plant.id == id);
    if(no < 0){
        return;
    }
    else{
        plants.splice(no, 1);
    }
}

const modifyPlant = (newPlant) => {
    const no = plants.indexOf(plant => plant.id == newPlant.id);
    if(no < 0){
        return;
    }
    else{
        plants[no] = newPlant;
    }
}

databaseAPI = { getPlants, getPlant, addPlant, removePlant, modifyPlant }

export default databaseAPI