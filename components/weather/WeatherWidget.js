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

  const [weather, setWeather] = useState();
  const [loadingWeather, setLoadingWeather] = useState(true);

  const [lat, setLat] = useState(52.24);
  const [lon, setLon] = useState(16.56);
  const [days, setDays] = useState(10);
  const [locationName, setLocationName] = useState('Poznań');

  const [latSettings, setLatSettings] = useState(52.24);
  const [lonSettings, setLonSettings] = useState(16.56);
  const [daysSettings, setDaysSettings] = useState(10);
  const [locationNameSettings, setLocationNameSettings] = useState('Poznań');

  const getWeather = async () => {
    setLoadingWeather(true);
    const weatherForecast = await weatherAPI.getWeather(lat, lon, days);
    setWeather(weatherForecast);
    setLoadingWeather(false);
  }

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLatSettings(location.coords.latitude);
    setLonSettings(location.coords.longitude);

    let locationName = await geocodingAPI.getLocation(location.coords.latitude, location.coords.longitude);

    setLocationNameSettings(`${locationName.city ? locationName.city : locationName.state}, ${locationName.country}`);
  }

  useEffect(() => {
    getWeather();
  }, [locationName]);

  useEffect(() => {
    getWeather();
  }, []);

  const renderDays = () => {
    let list = [];

    weather.forEach((day) => {
      list.push(
        <DailyWeather key={day.date} weather={day} />
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
      <View style={styles.weatherHeader}>
        <View style={{ flexDirection: 'column', alignItems: 'center', marginHorizontal: 10 }}>
          <Text style={styles.titleText}>Pogoda na najbliższe dni </Text>
          <Text style={styles.locationText}>{locationName} </Text>
        </View>
        <Pressable
          style={[commonStyles.button, commonStyles.primaryButton]}
          onPress={() => setWeatherSettingsModalVisibility(true)}
        >
          <Image source={Icons.gearWhite} style={{ width: 20, height: 20 }}></Image>
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
            <Text>{locationNameSettings}</Text>
            <Text>({latSettings.toFixed(2)}, {lonSettings.toFixed(2)})</Text>
            <Pressable
              style={[commonStyles.button, commonStyles.primaryButton]}
              onPress={getLocation}>
              <Text style={commonStyles.primaryButtonText}>pobierz lokalizacje</Text>
            </Pressable>
            <View style={{ flexDirection: 'row' }}>
              <Pressable
                style={[commonStyles.button, commonStyles.primaryButton]}
                onPress={() => {
                  setLat(latSettings);
                  setLon(lonSettings);
                  setDays(daysSettings);
                  setLocationName(locationNameSettings);
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
  weatherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 500,
  },
  locationText: {
    fontSize: 16,
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
