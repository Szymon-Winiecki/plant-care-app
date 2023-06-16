import { StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar, Pressable, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { plantsCRUD } from '../database/database';
import { getWateringState, wateringStatesIcons } from '../logic/watering';

import { commonStyles } from '../styles/common';
import * as Icons from '../constants/icons';

import PlantListElement from '../components/PlantListElement';
import ErrorScreen from '../components/ErrorScreen';
import LoadingScreen from '../components/LoadingScreen';
import InfoModal from '../components/InfoModal';
import WateringDropsLegend from '../components/WateringDropsLegend';
import TIButton from '../components/TIButton';

const IndexPage = props => {

  // określa, czy dane zostały już pobrane z bazy
  const [loading, setLoading] = useState(true);
  // określa, czy wystąpił błąd podczas ładowania danych
  const [error, setError] = useState(false);

  const [legendVisibility, setLegendVisibility] = useState(false);

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
      const icon = wateringStatesIcons[getWateringState(plant.last_watering, plant.wateringdays)];
      rendered.push(
        <PlantListElement key={id} name={plant.name} img={{ uri: plant.image + '?' + new Date() }} icon={icon} onClick={() => openDetails(plant.id)} />
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
      <InfoModal title='Legenda' body={<WateringDropsLegend />} visible={legendVisibility} setVisibility={(visibility) => setLegendVisibility(visibility)} />
      <View>
        <Text style={commonStyles.title} >TWOJE ROŚLINY</Text>
      </View>
      <View style={styles.buttonsRow}>
        <TIButton
          onPress={() => props.navigation.navigate('AddPlant', { action: 'add' })}
          icon={Icons.plusSquareWhite}
          text="dodaj"
        />
        <Pressable
          style={[commonStyles.iconButton, commonStyles.primaryButton]}
          onPress={() => setLegendVisibility(true)}
        >
          <Text style={[commonStyles.iconButtonText, commonStyles.primaryButtonText]}>?</Text>
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
    width: '90%',
  },
  buttonsRow: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default IndexPage;
