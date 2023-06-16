import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Pressable } from 'react-native';
import { commonStyles } from '../styles/common';
import WeatherWidget from '../components/weather/WeatherWidget';

const HomePage = ({ navigation }) => {

  useEffect(() => {
    const onBackPress = () => {
      return true;
    };
    const backHandler = navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type === 'GO_BACK' && navigation.isFocused()) {
        e.preventDefault(); 
        onBackPress(); 
      }
    });

    return () => {
      // Remove the event listener when the component is unmounted
      backHandler.remove();
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <WeatherWidget />
      <View style={styles.innerContainer}>
        <Text style={commonStyles.title}>Witaj!</Text>
        <Text style={styles.description}>plant-care to aplikacja do zarządzania roślinami</Text>
        <Pressable
          style={[commonStyles.button, commonStyles.primaryButton]}
          onPress={() => navigation.navigate('Index')}
        >
          <Text style={[commonStyles.buttonText, commonStyles.primaryButtonText]}>lista roślin</Text>
        </Pressable>
      </View>
    </SafeAreaView>
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
