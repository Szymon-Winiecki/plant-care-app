import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Pressable, Image, TextInput } from 'react-native';

import { plantsCRUD } from '../database/database';

import { commonStyles } from '../styles/common';

import ErrorScreen from '../components/ErrorScreen';
import LoadingScreen from '../components/LoadingScreen';

import * as ImagePicker from 'expo-image-picker';



const AlterPage = props => {

  // true, jeżeli edytujemy istniejącą roślinę, false jeżeli dodajemmy nową
  const edit = props.route.params.id != undefined;

  // określa, czy dane zostały już pobrane z bazy
  const [loading, setLoading] = useState(true);

  // określa, czy wystąpił błąd podczas ładowania danych
  const [error, setError] = useState(false);
  
  // zrobić tu kiedyś żeby pobrało aktualne zdjęcie jeżeli było
  const [imageUri, setImageUri] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const [plantName, setPlantName] = useState('')
  const [plantSpecies, setPlantSpecies] = useState('')
  const [plantDescription, setPlantDescription] = useState('')

  const getPlant = async () => {
    plantsCRUD.getPlant(props.route.params.id).then(plant => {
      if(plant == null){
        setError(true);
        setLoading(false);
        return;
      }
      setPlantName(plant.name);
      setPlantSpecies(plant.species);
      setPlantDescription(plant.description);
      setLoading(false);
    }).catch(error => setError(true));
  }

  useEffect(() => {
    if(edit){
      getPlant();
    }
    else{
      setLoading(false);
    }
  }, []);

  const addPlant = async () => {
    const plant = {
      name: plantName,
      species: plantSpecies,
      description: plantDescription,
      image: require('../assets/flop.jpg'),
    }

    plantsCRUD.addPlant(plant).then(id => props.navigation.goBack()).catch(error => setError(true));
  }

  const editPlant = async () => {
    const plant = {
      id: props.route.params.id,
      name: plantName,
      species: plantSpecies,
      description: plantDescription,
      image: require('../assets/flop.jpg'),
    }

    plantsCRUD.modifyPlant(plant).then(id => props.navigation.goBack()).catch(error => setError(true));
  }

  // jeżeli dane nie zostały jeszcze pobrane z bazy to wyświetamy informacje o ładwaniu danych
  if(loading){
    return ( <LoadingScreen action="Ładowanie danych..." message="proszę czekać"/> );
  }

  // jeżeli wystąpił bład to wyświetamy odpowiedni komunikat
  if(error){
    return ( <ErrorScreen error="Błąd ładowania danych" message="spróbuj ponownie później"/> );
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
          placeholder='opis...'
          onChangeText={newText => setPlantDescription(newText)}
          value={plantDescription}
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