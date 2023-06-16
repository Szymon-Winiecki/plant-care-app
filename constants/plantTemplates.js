import { Asset } from "expo-asset";

const defaultImageUri = Asset.fromModule(require('../assets/example-plant.png')).uri;

const generatePlantImageFileName = (id) => {
    return 'plant_' + id;
}

export { generatePlantImageFileName, defaultImageUri };