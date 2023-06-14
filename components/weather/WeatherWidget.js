import { StyleSheet, Text, View, ScrollView, Modal, Pressable, Image } from 'react-native';

import * as Icons from '../../constants/icons';
import { Colors } from '../../constants/colors';
import DailyWeather from './DailyWeather';
import { useEffect, useState } from 'react';
import { commonStyles } from '../../styles/common';
import * as weatherAPI from '../../api/weatherAPI';
import * as geocodingAPI from '../../api/geocodingAPI'
import * as Location from 'expo-location';

const WeatherWidget = props => {

  const [weatherSettingsModalVisibility, setWeatherSettingsModalVisibility] = useState(false);

  const [weather, setWeather] = useState({});
  const [loadingWeather, setLoadingWeather] = useState(true);

  const [lat, setLat] = useState(52.24);
  const [lon, setLon] = useState(16.56);
  const [days, setDays] = useState(10);
  const [locationName, setLocationName] = useState('Poznań');

  const getWeather = async () => {
    const weather = await weatherAPI.getWeather(lat, lon, days);
    setWeather(weather);
    setLoadingWeather(false);
  }

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLat(location.coords.latitude);
    setLon(location.coords.longitude);

    let locationName = await geocodingAPI.getLocation(lat, lon);

    setLocationName(`${locationName.city ? locationName.city : locationName.state}, ${locationName.country}`);
  }

  useEffect(() => {
    getWeather();
  }, []);

  const renderDays = () => {
    let list = [];

    weather.forEach((day, i) => {
      list.push(
        <DailyWeather key={i} weather={day} />
      );
    });

    return list;
  }

  if (loadingWeather) {
    return (
      <View style={styles.container}>
        <Text>Ładowanie danych...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
        <Text style={styles.titleText}>Pogoda na najbliższe dni ({locationName}): </Text>
        <Pressable
          style={[commonStyles.button, commonStyles.primaryButton]}
          onPress={() => setWeatherSettingsModalVisibility(true)}
        >
          <Image source={Icons.gear} style={{ width: 20, height: 20 }}></Image>
        </Pressable>
      </View>
      <ScrollView horizontal>
        {renderDays()}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={weatherSettingsModalVisibility}
        onRequestClose={() => {
          setWeatherSettingsModalVisibility(!weatherSettingsModalVisibility);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>lokalizacja: </Text>
            <Text>{locationName}</Text>
            <Text>({lat}, {lon})</Text>
            <Pressable
              style={[commonStyles.button, commonStyles.primaryButton]}
              onPress={getLocation}>
              <Text style={commonStyles.primaryButtonText}>pobierz lokalizacje</Text>
            </Pressable>
            <View style={{ flexDirection: 'row' }}>
              <Pressable
                style={[commonStyles.button, commonStyles.primaryButton]}
                onPress={() => {
                  getLocation();
                  setWeatherSettingsModalVisibility(!weatherSettingsModalVisibility)
                }}>
                <Text style={commonStyles.primaryButtonText}>ok</Text>
              </Pressable>
              <Pressable
                style={[commonStyles.button, commonStyles.secondaryButton]}
                onPress={() => {
                  setWeatherSettingsModalVisibility(!weatherSettingsModalVisibility)
                }}>
                <Text style={commonStyles.secondaryButtonText}>anuluj</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 500,
  },

  /* modal */
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default WeatherWidget;
