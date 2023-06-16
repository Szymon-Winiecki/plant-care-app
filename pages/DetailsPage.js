import { StyleSheet, Text, View, SafeAreaView, StatusBar, Pressable, Image, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { plantsCRUD } from '../database/database';

import { commonStyles } from '../styles/common';
import * as Icons from '../constants/icons';

import { formatTimestamp } from '../helpers/formatHelper';

import ErrorScreen from '../components/ErrorScreen';
import LoadingScreen from '../components/LoadingScreen';
import PlantProperty from '../components/PlantProperty';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

const DetailsPage = (props) => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [deleteConfirmModalVisibility, setDeleteConfirmModalVisibility] = useState(false);
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

  const deletePlant = async () => {
    await plantsCRUD.removePlant(plant.id);
    props.navigation.goBack();
  }


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
      <DeleteConfirmModal
        title="Usuwanie"
        body={<Text>Czy na pewno chcesz usunąć tą roślinę?</Text>}
        cancelButtonText="Anuluj"
        deleteButtonText="Usuń"
        onConfirm={() => deletePlant()}
        visible={deleteConfirmModalVisibility}
        setVisibility={(visibility) => setDeleteConfirmModalVisibility(visibility)}
      />
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
      <View style={styles.buttonsRow}>
        <Pressable
          style={[commonStyles.flexButton, commonStyles.primaryButton, { flex: 1 }]}
          onPress={() => props.navigation.navigate('EditPlant', { id: plant.id })}
        >
          <View style={commonStyles.row}>
            <Image style={commonStyles.buttonIcon} source={Icons.edit}></Image>
            <Text style={[commonStyles.buttonText, commonStyles.primaryButtonText, { marginLeft: 10 }]}>edytuj</Text>
          </View>
        </Pressable>
        <Pressable
          style={[commonStyles.flexButton, commonStyles.redButton, { flex: 1 }]}
          onPress={() => { setDeleteConfirmModalVisibility(true) }}
        >
          <View style={commonStyles.row}>
            <Image style={commonStyles.buttonIcon} source={Icons.trash}></Image>
            <Text style={[commonStyles.buttonText, commonStyles.redButtonText, { marginLeft: 10 }]}>usuń</Text>
          </View>
        </Pressable>
        <Pressable
          style={[commonStyles.flexButton, commonStyles.primaryButton, { flex: 1, paddingVertical: 12 }]}
          onPress={async () => {
            plantsCRUD.waterPlantNow(plant.id);
            getPlant();
          }}
        >
          <View style={commonStyles.row}>
            <Image style={commonStyles.buttonIcon} source={Icons.watering_can}></Image>
            <Text style={[commonStyles.buttonText, commonStyles.primaryButtonText, { marginLeft: 10 }]}>podlej</Text>
          </View>
        </Pressable>
      </View>
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
  buttonsRow: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
    marginHorizontal: 10,
    flexWrap: 'wrap',
  }

});

export default DetailsPage;
