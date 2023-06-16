import { makeDirectoryAsync, documentDirectory, getInfoAsync, copyAsync, deleteAsync } from "expo-file-system";

const plantsImagesDirectory = '/images/plants/'

const getFileExtension = (uri) => {
    const lastDot = uri.lastIndexOf('.');
    if (lastDot < 0) {
        return '';
    }
    const extension = uri.substring(lastDot);
    return extension;
}

const initFileSystem = async () => {
    const dirToMake = plantsImagesDirectory.split('/');
    if (dirToMake[0] == "") dirToMake.splice(0, 1);
    if (dirToMake[dirToMake.length - 1] == "") dirToMake.splice(dirToMake.length - 1, 1);
    let nextDir = documentDirectory;
    for (let i = 0; i < dirToMake.length; i++) {
        nextDir += dirToMake[i] + '/';
        const dirInfo = await getInfoAsync(nextDir);
        if (dirInfo.exists) {
            continue;
        }
        await makeDirectoryAsync(nextDir);
    }

}

const resetFileSystem = async () => {
    const plantImagesDirectoryUri = documentDirectory + plantsImagesDirectory;
    try {
        await deleteAsync(plantImagesDirectoryUri);
    } catch (error) {
        console.log(error);
    }

    await initFileSystem();
}

const generatePlantImageUri = (filename) => {
    return documentDirectory + plantsImagesDirectory + filename;
}

const deleteFile = async (uri) => {
    try {
        await deleteAsync(uri);
    } catch (error) {
        console.log(error);
    }
}

const savePlantImage = async (from, to) => {
    if (from == to) {
        return true;
    }

    try {
        let fileInfo = await getInfoAsync(from);
        if (!fileInfo.exists) {
            console.log('file', from, 'does not exists');
            return false;
        }

        fileInfo = await getInfoAsync(to);
        if (fileInfo.exists) {
            await deleteAsync(to);
        }

    }
    catch (error) {
        return false;
    }

    try {
        await copyAsync({ from: from, to: to });
    } catch (error) {
        console.log(error);
        return false;
    }

    return true;
}

export { initFileSystem, resetFileSystem, generatePlantImageUri, savePlantImage, getFileExtension, deleteFile };