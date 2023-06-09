// import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar, TextInput, Pressable } from 'react-native';

import PlantListElement from './components/PlantListElement';

import { commonStyles } from './styles/common';

export default function App() {
  const [newPlantName, setNewPlantName] = useState('');
  const [plants, setPlants] = useState([]);

  const addPlant = () => {
    setPlants(old => [...old, newPlantName]);
    setNewPlantName('');
  }

  const renderPlantsList = () => {
    const rendered = []

    plants.forEach(plant => {
      rendered.push(
        <PlantListElement name={plant}/>
      )
    });

    return rendered
  }

  return (
    <SafeAreaView  style={styles.container}>
      <View>
        <Text style={commonStyles.title} >TWOJE ROŚLINY</Text>
      </View>
      <View style={commonStyles.row}>
        <TextInput 
          placeholder='nazwa rośliny...'
          onChangeText={newText => setNewPlantName(newText)}
          value={newPlantName}
        />
        <Pressable 
          style={commonStyles.primaryButton}
          onPress={() => addPlant()}
        >
          <Text style={commonStyles.primaryButtonText}>dodaj</Text>
        </Pressable>
      </View>
      <View style={styles.list}>
        {renderPlantsList()}
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
  list: {
    width: '70%',
  }
});
