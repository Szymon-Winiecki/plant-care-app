import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Pressable, Image, TextInput, KeyboardAvoidingView, ScrollView, Dimensions, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ModalDropdown from 'react-native-modal-dropdown';

import { plantsCRUD } from '../database/database';
import { defaultImageUri } from '../constants/plantTemplates';

import { commonStyles } from '../styles/common';
import * as Icons from '../constants/icons';

import ErrorScreen from '../components/ErrorScreen';
import LoadingScreen from '../components/LoadingScreen';
import TIButton from '../components/TIButton';

const AlterPage = props => {
  // true, jeżeli edytujemy istniejącą roślinę, false jeżeli dodajemmy nową
  const edit = props.route.params.id != undefined;

  // określa, czy dane zostały już pobrane z bazy
  const [loading, setLoading] = useState(true);

  // określa, czy wystąpił błąd podczas ładowania danych
  const [error, setError] = useState(false);

  const [plantName, setPlantName] = useState('');
  const [plantSpecies, setPlantSpecies] = useState('');
  const [plantDescription, setPlantDescription] = useState('');
  const [plantImage, setPlantImage] = useState(defaultImageUri);
  const [plantWateringDays, setPlantWateringDays] = useState(0);

  const [keyboardHeight, setKeyboardHeight] = useState(50);
  const windowHeight = Dimensions.get('window').height;


  const getPlant = async () => {
    plantsCRUD
      .getPlant(props.route.params.id)
      .then(plant => {
        if (plant == null) {
          setError(true);
          setLoading(false);
          return;
        }
        setPlantName(plant.name);
        setPlantSpecies(plant.species);
        setPlantDescription(plant.description);
        setPlantImage(plant.image);
        setPlantWateringDays(plant.wateringdays);
        setLoading(false);
      })
      .catch(error => setError(true));
  };
  const handleKeyboardShow = (e) => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
    if (edit) {
      getPlant();
    } else {
      setLoading(false);
    }
  }, []);

  const addPlant = async () => {
    const plant = {
      name: plantName,
      species: plantSpecies,
      description: plantDescription,
      image: plantImage,
      wateringdays: plantWateringDays,
    };

    plantsCRUD
      .addPlant(plant)
      .then(id => props.navigation.goBack())
      .catch(error => setError(true));
  };

  const editPlant = async () => {
    const plant = {
      id: props.route.params.id,
      name: plantName,
      species: plantSpecies,
      description: plantDescription,
      image: plantImage,
      wateringdays: plantWateringDays,
    };

    plantsCRUD
      .modifyPlant(plant)
      .then(id => props.navigation.goBack())
      .catch(error => setError(true));
  };

  // jeżeli dane nie zostały jeszcze pobrane z bazy to wyświetamy informacje o ładwaniu danych
  if (loading) {
    return <LoadingScreen action="Ładowanie danych..." message="proszę czekać" />;
  }

  // jeżeli wystąpił bład to wyświetamy odpowiedni komunikat
  if (error) {
    return <ErrorScreen error="Błąd ładowania danych" message="spróbuj ponownie później" />;
  }

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access the camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setPlantImage(pickerResult.assets[0].uri);
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
      setPlantImage(pickerResult.assets[0].uri);
    }
  };
  const renderPickerItems = () => {
    const items = [];
    for (let i = 0; i <= 30; i++) {
      items.push(`${i} ${i != 1 ? 'dni' : 'dzień'}`);
    }
    return items;
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position" keyboardVerticalOffset={Platform.OS === 'android' ? -keyboardHeight / 2 : 50}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={commonStyles.title}>{edit ? 'Edytuj' : 'Dodaj nową'} roślinę</Text>
        <View style={styles.innerContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: plantImage }} style={styles.image} />
            <TIButton
              onPress={openImagePickerAsync}
              icon={Icons.image}
              text="wybierz obraz"
              buttonStyle={[commonStyles.secondaryButton, { width: 200 }]}
            />
            <TIButton
              onPress={openCameraAsync}
              icon={Icons.camera}
              text="zrób zdjęcie"
              buttonStyle={[commonStyles.secondaryButton, { width: 200 }]}
            />
            {/* <Pressable
              style={[commonStyles.button, commonStyles.secondaryButton]}
              onPress={openImagePickerAsync}
            >
              <Image style={commonStyles.buttonIcon} source={Icons.image}></Image>
              <Text style={[commonStyles.buttonText, commonStyles.secondaryButtonText]}>Choose Image</Text>
            </Pressable>
            <Pressable
              style={[commonStyles.button, commonStyles.secondaryButton]}
              onPress={openCameraAsync}
            >
              <Text style={[commonStyles.buttonText, commonStyles.secondaryButtonText]}>Take Photo</Text>
            </Pressable> */}
          </View>

          <TextInput
            style={commonStyles.input}
            placeholder="nazwa rośliny..."
            onChangeText={newText => setPlantName(newText)}
            value={plantName}
          />

          <TextInput
            style={commonStyles.input}
            placeholder="gatunek..."
            onChangeText={newText => setPlantSpecies(newText)}
            value={plantSpecies}
          />


          <TextInput
            style={commonStyles.input}
            placeholder="opis..."
            onChangeText={newText => setPlantDescription(newText)}
            value={plantDescription}
          />
          <View style={styles.propertyContainer}>
            <Text>podlewanie co:</Text>
            <ModalDropdown
              options={renderPickerItems()}
              defaultValue={`${plantWateringDays} ${plantWateringDays != 1 ? 'dni' : 'dzień'}`}
              textStyle={styles.pickerText}
              dropdownStyle={styles.dropDownContainer}
              onSelect={(id, val) => setPlantWateringDays(parseInt(val.split(" ")[0]))}
            />
          </View>

          <View style={styles.buttonsRow}>
            <TIButton
              onPress={() => {
                if (edit) editPlant();
                else addPlant();
              }}
              flexButton
              text={edit ? 'zmień' : 'dodaj'}
            />
            <TIButton
              onPress={() => {
                props.navigation.goBack();
              }}
              text="Anuluj"
              flexButton
              buttonStyle={[commonStyles.secondaryButton, { paddingVertical: 12 }]}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',

  },
  innerContainer: {
    width: '80%',

    marginTop: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  inputContainer: {
    marginTop: 0,
  },
  pickerText: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  dropDownContainer: {
    marginTop: 2,
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  propertyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    marginVertical: 20,
  },
  buttonsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
    flexWrap: 'wrap',
  }
});

export default AlterPage;
