import { Asset } from "expo-asset";

const defaultImageUri = Asset.fromModule(require('../assets/flop.jpg')).uri;

const generatePlantImageFileName = (id) => {
    return 'plant_' + id;
}

export { generatePlantImageFileName, defaultImageUri };