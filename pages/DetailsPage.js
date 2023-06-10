import { StyleSheet, Text, View , SafeAreaView , StatusBar, Pressable } from 'react-native';

import databaseAPI from '../database/database';

import { commonStyles } from '../styles/common';
import { useIsFocused } from '@react-navigation/native';

const DetailsPage = props => {

  // it causes the page to refresh after getting back from nav stack
  let isFocused = useIsFocused();
  
  const plant = databaseAPI.getPlant(props.route.params.id);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={commonStyles.title} > {plant.name} </Text>
      </View>
      <View style={styles.propertyContainer}>
        <Text style={commonStyles.label}> gatunek: </Text>
        <Text style={commonStyles.property}> {plant.species} </Text>
      </View>
      <View style={styles.propertyContainer}>
        <Text style={commonStyles.label}> podlewanie: </Text>
        <Text style={commonStyles.property}> {plant.watering} </Text>
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
});

export default DetailsPage;
