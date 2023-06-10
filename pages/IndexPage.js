import { StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar, Pressable } from 'react-native';

import databaseAPI from '../database/database';

import PlantListElement from '../components/PlantListElement';

import { commonStyles } from '../styles/common';
import { useIsFocused } from '@react-navigation/native';

const IndexPage = props => {

  // it causes the page to refresh after getting back from nav stack
  let isFocused = useIsFocused();

  const openDetails = (id) => {
    props.navigation.navigate('Details', {id: id});
  }

  const renderPlantsList = () => {

    const plants = databaseAPI.getPlants();

    const rendered = []

    plants.forEach(plant => {
      const id = "plant_" + plant.id;
      rendered.push(
        <PlantListElement key={id} name={plant.name} onClick={() => openDetails(plant.id)}/>
      )
    });

    return rendered
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={commonStyles.title} >TWOJE ROŚLINY</Text>
      </View>
      <View style={commonStyles.row}>
        <Pressable 
          style={[commonStyles.button, commonStyles.primaryButton]}
          onPress={() => props.navigation.navigate('AddPlant', {action: 'add'})}
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
  }
});

export default IndexPage;
