import { StyleSheet, Text, View, SafeAreaView, StatusBar, Pressable, Image } from 'react-native';
import { plantsCRUD } from '../database/database';
import { commonStyles } from '../styles/common';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import ErrorScreen from '../components/ErrorScreen';
import LoadingScreen from '../components/LoadingScreen';
import ModalDropdown from 'react-native-modal-dropdown';

const DetailsPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [plant, setPlant] = useState({});
  const [notificationDays, setNotificationDays] = useState(0);

  const getPlant = async () => {
    plantsCRUD
      .getPlant(props.route.params.id)
      .then((plant) => {
        if (plant == null) {
          setError(true);
          setLoading(false);
          return;
        }
        setPlant(plant);
        setLoading(false);
        setNotificationDays(plant.wateringdays)
      })
      .catch((error) => setError(true));
  };

  // modify watering days
  const editPlant = async () => {
    //to fix
    //console.log(notificationDays);
    //plant.wateringdays = notificationDays[0];
    plantsCRUD
      .modifyPlant(plant)
      .then(getPlant())
      .catch(error => setError(true));
  };

  useEffect(() => {
    getPlant();
  }, []);

  let isFocused = useIsFocused();
  useEffect(() => {
    getPlant();
  }, [isFocused]);

  if (loading) {
    return <LoadingScreen action="Ładowanie danych..." message="proszę czekać" />;
  }

  if (error) {
    return <ErrorScreen error="Błąd ładowania danych" message="spróbuj ponownie później" />;
  }

  const handlePickerChange = (id, value) => {
    // to fix
    setNotificationDays(value);
    editPlant();
  };

  const renderPickerItems = () => {
    const items = [];
    for (let i = 0; i <= 30; i++) {
      items.push(`${i} ${i != 1 ? 'dni' : 'dzień'}`);
    }
    return items;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={{ uri: plant.image + '?' + new Date() }} style={styles.image} />
      </View>
      <View>
        <Text style={commonStyles.title}>{plant.name}</Text>
      </View>
      <View style={styles.propertyContainer}>
        <Text style={commonStyles.label}>gatunek:</Text>
        <Text style={commonStyles.property}>{plant.species}</Text>
      </View>
      <View style={styles.propertyContainer}>
        <Text style={commonStyles.label}>opis:</Text>
        <Text style={commonStyles.property}>{plant.description}</Text>
      </View>
      <View style={styles.propertyContainer}>
      <Text style={commonStyles.label}>podlewanie co:</Text>
        <ModalDropdown
          options={renderPickerItems()}
          defaultValue={`${plant.wateringdays} ${plant.wateringdays != 1 ? 'dni' : 'dzień'}`}
          textStyle={styles.pickerText}
          dropdownStyle={styles.dropDownContainer}
          onSelect={(id, val) => handlePickerChange(id, val)}
        />
      </View>
      <Pressable
        style={[commonStyles.button, commonStyles.primaryButton]}
        onPress={() => props.navigation.navigate('EditPlant', { id: plant.id })}
      >
        <Text style={[commonStyles.buttonText, commonStyles.primaryButtonText]}>edytuj</Text>
      </Pressable>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  propertyContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: 10,
    marginVertical: 20,
  },
  image: {
    width: 200,
    height: 200,
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
});

export default DetailsPage;