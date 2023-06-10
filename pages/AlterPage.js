import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar, Pressable, Image, TextInput } from 'react-native';

import databaseAPI from '../database/database';

import { commonStyles } from '../styles/common';


import * as ImagePicker from 'expo-image-picker';



const AlterPage = props => {

  const edit = props.route.params.id != undefined;
  let plant = edit ? databaseAPI.getPlant(props.route.params.id) : {};

  const [plantName, setPlantName] = useState(edit ? plant.name : '')
  const [plantSpecies, setPlantSpecies] = useState(edit ? plant.species : '')
  const [plantWatering, setPlantWatering] = useState(edit ? plant.watering : '')
  
  // zrobić tu kiedyś żeby pobrało aktualne zdjęcie jeżeli było
  const [imageUri, setImageUri] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

 
  const addPlant = () => {
    plant.name = plantName;
    plant.species = plantSpecies;
    plant.watering = plantWatering;

    databaseAPI.addPlant(plant);
    props.navigation.goBack()
  }

  const editPlant = () => {
    plant.name = plantName;
    plant.species = plantSpecies;
    plant.watering = plantWatering;
    //plant.image = imageUri;

    databaseAPI.modifyPlant(plant);
    props.navigation.goBack()
  }

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert('Permission to access the camera roll is required!');
      return;
    }
  
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setImageUri(pickerResult.assets[0].uri);
      setSelectedImage(<Image source={{ uri: pickerResult.assets[0].uri }} style={styles.selectedImage} />);
    }
  };
  
  
  const openCameraAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert('Permission to access the camera is required!');
      return;
    }
  
    const pickerResult = await ImagePicker.launchCameraAsync();
    if (!pickerResult.canceled) {
      setImageUri(pickerResult.assets[0].uri);
      setSelectedImage(<Image source={{ uri: pickerResult.assets[0].uri }} style={styles.selectedImage} />);
    }
  };
  
  

  return (
    <SafeAreaView style={styles.container}>
    <View>
        <Text style={commonStyles.title} >{edit ? 'Edytuj' : 'Dodaj nową'} roślinę</Text>
      </View>
        <View style={[commonStyles.column, styles.fields]}>
          <View style={styles.imageContainer}>
          {selectedImage && ( // powinno się wyświetlić aktualne zdj ale na razie nie będzie działać
            <View style={styles.selectedImageContainer}>
              {selectedImage}
            </View>
          )}
          <Pressable
            style={[commonStyles.button, commonStyles.secondaryButton]}
            onPress={openImagePickerAsync}
          >
            <Text style={[commonStyles.buttonText, commonStyles.secondaryButtonText]}>
              Choose Image
            </Text>
          </Pressable>
          <Pressable
            style={[commonStyles.button, commonStyles.secondaryButton]}
            onPress={openCameraAsync}
          >
            <Text style={[commonStyles.buttonText, commonStyles.secondaryButtonText]}>
              Take Photo
            </Text>
          </Pressable>
          {selectedImage}
        </View>
        <TextInput 
          style={commonStyles.input}
          placeholder='nazwa rośliny...'
          onChangeText={newText => setPlantName(newText)}
          value={plantName}
        />
        <TextInput 
          style={commonStyles.input}
          placeholder='gatunek...'
          onChangeText={newText => setPlantSpecies(newText)}
          value={plantSpecies}
        />
        <TextInput 
          style={commonStyles.input}
          placeholder='podlewanie...'
          onChangeText={newText => setPlantWatering(newText)}
          value={plantWatering}
        />
        <Pressable 
          style={[commonStyles.button, commonStyles.primaryButton]}
          onPress={() => {if(edit) editPlant(); else addPlant()}}
        >
          <Text style={[commonStyles.buttonText, commonStyles.primaryButtonText]}>{edit ? 'zmień' : 'dodaj'}</Text>
        </Pressable>
        <Pressable 
          style={[commonStyles.button, commonStyles.secondaryButton]}
          onPress={() => {props.navigation.goBack()}}
        >
          <Text style={[commonStyles.buttonText, commonStyles.secondaryButtonText]}>Anuluj</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  fields:{
    width: '70%',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
  },
});

export default AlterPage;