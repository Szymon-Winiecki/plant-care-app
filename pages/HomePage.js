import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Pressable, Image } from 'react-native';

import { commonStyles } from '../styles/common';
import * as Icons from '../constants/icons';

import WeatherWidget from '../components/weather/WeatherWidget';
import TIButton from '../components/TIButton';
import { Colors } from '../constants/colors';

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
      <View style={styles.innerContainer}>
        <Text style={styles.appName}>PLANT-CARE</Text>
        <Text style={styles.description}>Plant-care to aplikacja, która ułatwi Ci zarządzanie twoimi roślinami. Dodaj swoje rośliny do listy i regualrnie zaglądaj do aplikacji, aby sprawdzić czy nie należy którejś podlać.
          Pamiętaj, że w naszej apce zawsze możesz sprawdzić aktualną prognozę pogody w twojej okolicy. Po co podlewac kwiaty w ogódku, skoro zaraz będzie padać?</Text>
        <TIButton
          onPress={() => navigation.navigate('Index')}
          icon={Icons.plant}
          text="lista roślin"
          buttonStyle={[commonStyles.primaryButton, { width: '100%', paddingVertical: 30 }]}
          textStyle={[commonStyles.primaryButtonText, { fontSize: 30, fontWeight: 500 }]}
          iconStyle={{ width: 40, height: 40 }}
          gap={30}
        />
        {/* <Pressable
          style={[commonStyles.button, commonStyles.primaryButton]}
          onPress={() => navigation.navigate('Index')}
        >
          <Image style={commonStyles.buttonIcon} source={Icons.plant}></Image>
          <Text style={[commonStyles.buttonText, commonStyles.primaryButtonText]}>lista roślin</Text>
        </Pressable> */}
      </View>
      <WeatherWidget />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 0,
  },
  innerContainer: {
    width: '90%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appName: {
    fontWeight: 800,
    fontSize: 40,
    color: Colors.primary,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 6,
  },
  description: {
    fontSize: 16,
    fontWeight: 500,
    color: Colors.darkGrey,
    textAlign: 'justify',

    marginVertical: 20,
  },
});

export default HomePage;
