import { StyleSheet, Text, View , SafeAreaView , StatusBar, Pressable, Image } from 'react-native';

import { plantsCRUD } from '../database/database';

import { commonStyles } from '../styles/common';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import ErrorScreen from '../components/ErrorScreen';
import LoadingScreen from '../components/LoadingScreen';

const DetailsPage = props => {

   // określa, czy dane zostały już pobrane z bazy
   const [loading, setLoading] = useState(true);

   // określa, czy wystąpił błąd podczas ładowania danych
   const [error, setError] = useState(false);

   const [plant, setPlant] = useState({});
  

   const getPlant = async () => {
    plantsCRUD.getPlant(props.route.params.id).then(plant => {
      if(plant == null){
        setError(true);
        setLoading(false);
        return;
      }
      setPlant(plant);
      setLoading(false);
    }).catch(error => setError(true));
  }

  useEffect(() => {
    getPlant();
  }, []);

  // it causes the page to refresh after getting back from nav stack
  let isFocused = useIsFocused();
  useEffect(() => {
    getPlant();
  }, [isFocused])

  // jeżeli dane nie zostały jeszcze pobrane z bazy to wyświetamy informacje o ładwaniu danych
  if(loading){
    return ( <LoadingScreen action="Ładowanie danych..." message="proszę czekać"/> );
  }

  // jeżeli wystąpił bład to wyświetamy odpowiedni komunikat
  if(error){
    return ( <ErrorScreen error="Błąd ładowania danych" message="spróbuj ponownie później"/> );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={{uri:plant.image + '?' + new Date()}} style={styles.image}  />
      </View>
      <View>
        <Text style={commonStyles.title} > {plant.name} </Text>
      </View>
      <View style={styles.propertyContainer}>
        <Text style={commonStyles.label}> gatunek: </Text>
        <Text style={commonStyles.property}> {plant.species} </Text>
      </View>
      <View style={styles.propertyContainer}>
        <Text style={commonStyles.label}> opis: </Text>
        <Text style={commonStyles.property}> {plant.description} </Text>
      </View>
      <Pressable 
          style={[commonStyles.button, commonStyles.primaryButton]}
          onPress={() => props.navigation.navigate('EditPlant', {id: plant.id})}
        >
          <Text style={[commonStyles.buttonText, commonStyles.primaryButtonText]}>edytuj</Text>
        </Pressable>
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
  propertyContainer:{
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: 10,
    marginVertical: 20
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default DetailsPage;
