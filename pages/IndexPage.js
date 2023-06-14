import { StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar, Pressable, Image } from 'react-native';

import { plantsCRUD } from '../database/database';

import { commonStyles } from '../styles/common';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import PlantListElement from '../components/PlantListElement';
import ErrorScreen from '../components/ErrorScreen';
import LoadingScreen from '../components/LoadingScreen';

const IndexPage = props => {

  // określa, czy dane zostały już pobrane z bazy
  const [loading, setLoading] = useState(true);

  // określa, czy wystąpił błąd podczas ładowania danych
  const [error, setError] = useState(false);

  let [plants, setPlants] = useState([]);

  const getPlants = () => {
    plantsCRUD.getPlants().then(data => {
      setPlants(data);
      setLoading(false);
    }).catch(error => setError(true));
  }

  useEffect(() => {
    getPlants();
  }, []);

  // it causes the page to refresh after getting back from nav stack
  let isFocused = useIsFocused();
  useEffect(() => {
    getPlants();
  }, [isFocused])

  const openDetails = (id) => {
    props.navigation.navigate('Details', { id: id });
  }

  const renderPlantsList = () => {
    const rendered = []

    plants.forEach(plant => {
      const id = "plant_" + plant.id;

      rendered.push(
        <PlantListElement key={id} name={plant.name} img={{ uri: plant.image + '?' + new Date() }} onClick={() => openDetails(plant.id)} />
      )
    });

    return rendered
  }

  // jeżeli dane nie zostały jeszcze pobrane z bazy to wyświetamy informacje o ładwaniu danych
  if (loading) {
    return (<LoadingScreen action="Ładowanie danych..." message="proszę czekać" />);
  }

  // jeżeli wystąpił bład to wyświetamy odpowiedni komunikat
  if (error) {
    return (<ErrorScreen error="Błąd ładowania danych" message="spróbuj ponownie później" />);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={commonStyles.title} >TWOJE ROŚLINY</Text>
      </View>
      <View style={commonStyles.row}>
        <Pressable
          style={[commonStyles.button, commonStyles.primaryButton]}
          onPress={() => props.navigation.navigate('AddPlant', { action: 'add' })}
        >
          <Text style={[commonStyles.buttonText, commonStyles.primaryButtonText]}>dodaj</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.list}>
        {renderPlantsList()}
      </ScrollView>
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
  list: {
    width: '70%',
  },
});

export default IndexPage;
