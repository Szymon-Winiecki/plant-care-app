import { StyleSheet, Text, View, SafeAreaView, StatusBar, Pressable, Image, ScrollView } from 'react-native';
import { plantsCRUD } from '../database/database';
import { commonStyles } from '../styles/common';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import ErrorScreen from '../components/ErrorScreen';
import LoadingScreen from '../components/LoadingScreen';
import PlantProperty from '../components/PlantProperty';
import { formatTimestamp } from '../helpers/formatHelper';

const DetailsPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [plant, setPlant] = useState({});

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
      })
      .catch((error) => setError(true));
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


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={{ uri: plant.image + '?' + new Date() }} style={styles.image} />
      </View>
      <View>
        <Text style={commonStyles.title}>{plant.name}</Text>
      </View>
      <ScrollView>
        <PlantProperty label="gatunek" property={plant.species} />
        <PlantProperty label="opis" property={plant.description} />
        <PlantProperty label="Podlewanie co" property={`${plant.wateringdays} ${plant.wateringdays != 1 ? 'dni' : 'dzień'}`} />
        <PlantProperty label="ostatnio podlewany" property={formatTimestamp(plant.last_watering)} />
      </ScrollView>
      <Pressable
        style={[commonStyles.button, commonStyles.primaryButton]}
        onPress={() => props.navigation.navigate('EditPlant', { id: plant.id })}
      >
        <Text style={[commonStyles.buttonText, commonStyles.primaryButtonText]}>edytuj</Text>
      </Pressable>
      <Pressable
        style={[commonStyles.button, commonStyles.primaryButton]}
        onPress={async () => {
          plantsCRUD.waterPlantNow(plant.id);
          getPlant();
        }}
      >
        <Text style={[commonStyles.buttonText, commonStyles.primaryButtonText]}>podlej</Text>
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
  
});

export default DetailsPage;
