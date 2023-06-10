import { useState } from 'react';
import { StyleSheet, Text, View , SafeAreaView, StatusBar, TextInput, Pressable } from 'react-native';

import databaseAPI from '../database/database';

import { commonStyles } from '../styles/common';

const AlterPage = props => {

  const edit = props.route.params.id != undefined;
  let plant = edit ? databaseAPI.getPlant(props.route.params.id) : {};

  const [plantName, setPlantName] = useState(edit ? plant.name : '')
  const [plantSpecies, setPlantSpecies] = useState(edit ? plant.species : '')
  const [plantWatering, setPlantWatering] = useState(edit ? plant.watering : '')

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

    databaseAPI.modifyPlant(plant);
    props.navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
    <View>
        <Text style={commonStyles.title} >{edit ? 'Edytuj' : 'Dodaj nową'} roślinę</Text>
      </View>
      <View style={[commonStyles.column, styles.fields]}>
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
  }
});

export default AlterPage;
