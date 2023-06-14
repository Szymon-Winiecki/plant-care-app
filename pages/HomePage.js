import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, Pressable, Button } from 'react-native';

import { commonStyles } from '../styles/common';
import WeatherWidget from '../components/weather/WeatherWidget';
import * as weatherAPI from '../api/weatherAPI';
import { useEffect, useState } from 'react';

const HomePage = props => {

  return (
    <SafeAreaView style={styles.container}>
      <WeatherWidget />
      <View style={styles.innerContainer}>
        <Text style={commonStyles.title}>Witaj!</Text>
        <Text style={styles.description}>plant-care to apliakcja do zarządzania roślinami</Text>
        <Pressable
          style={[commonStyles.button, commonStyles.primaryButton]}
          onPress={() => props.navigation.navigate('Index')}
        >
          <Text style={[commonStyles.buttonText, commonStyles.primaryButtonText]}>lista roślin</Text>
        </Pressable>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  innerContainer: {
    width: '90%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomePage;
