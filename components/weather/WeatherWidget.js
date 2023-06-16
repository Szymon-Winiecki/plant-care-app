import { StyleSheet, Text, View, ScrollView, Modal, Pressable, Image } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

import * as Icons from '../../constants/icons';
import * as Colors from '../../constants/colors';
import { commonStyles } from '../../styles/common';
import { modalStyles } from '../../styles/modal';

import * as weatherAPI from '../../api/weatherAPI';
import * as geocodingAPI from '../../api/geocodingAPI'

import DailyWeather from './DailyWeather';

const WeatherWidget = props => {

  const [weatherSettingsModalVisibility, setWeatherSettingsModalVisibility] = useState(false);

  const [weather, setWeather] = useState();
  const [loadingWeather, setLoadingWeather] = useState(true);

  const [lat, setLat] = useState(52.24);
  const [lon, setLon] = useState(16.56);
  const [days, setDays] = useState(10);
  const [locationName, setLocationName] = useState('Poznań, Polska');

  const [latSettings, setLatSettings] = useState(52.24);
  const [lonSettings, setLonSettings] = useState(16.56);
  const [daysSettings, setDaysSettings] = useState(10);
  const [locationNameSettings, setLocationNameSettings] = useState('Poznań, Polska');

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
  }, [locationName, days, lon, lat]);

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
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 4, flexDirection: 'column', alignItems: 'center', marginHorizontal: 10 }}>
          <Text style={styles.titleText}>Pogoda na najbliższe dni </Text>
          <Text style={styles.locationText}>{locationName} </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Pressable
            style={[commonStyles.iconButton, commonStyles.primaryButton]}
            onPress={() => setWeatherSettingsModalVisibility(true)}
          >
            <Image source={Icons.gearWhite} style={[commonStyles.iconButtonIcon]}></Image>
          </Pressable>
        </View>
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
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <View style={modalStyles.modalHeader}>
              <Text style={modalStyles.modalTitle}>Ustawienia pogody</Text>
            </View>

            <View style={modalStyles.modalBody}>
              <View style={styles.fullWidthRow}>
                <Text style={styles.categoryLabel}>Lokalizacja:</Text>
              </View>
              <View style={styles.fullWidthRow}>
                <Text>{locationNameSettings}</Text>
                <Text>({latSettings.toFixed(2)}, {lonSettings.toFixed(2)})</Text>
              </View>
              <View style={styles.fullWidthRow}>
                <Text style={modalStyles.modalText}>ustaw z GPS: </Text>
                <Pressable
                  style={[commonStyles.iconButton, commonStyles.primaryButton]}
                  onPress={getLocation}>
                  <Image source={Icons.locationWhite} style={commonStyles.iconButtonIcon}></Image>
                </Pressable>
              </View>

              <View style={styles.fullWidthRow}>
                <Text style={styles.categoryLabel}>Ilość dni:</Text>
              </View>
              <View style={styles.fullWidthRow}>
                <Pressable
                  style={[commonStyles.iconButton, commonStyles.primaryButton, { backgroundColor: Colors.backgroundColor }]}
                  onPress={() => setDaysSettings(old => old - 1)}>
                  <Image source={Icons.minusSquare} style={[commonStyles.iconButtonIcon]}></Image>
                </Pressable>
                <Text>{daysSettings}</Text>
                <Pressable
                  style={[commonStyles.iconButton, commonStyles.primaryButton, { backgroundColor: Colors.backgroundColor }]}
                  onPress={() => setDaysSettings(old => old + 1)}>
                  <Image source={Icons.plusSquare} style={[commonStyles.iconButtonIcon]}></Image>
                </Pressable>
              </View>
            </View>

            <View style={modalStyles.modalFooter}>
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
  fullWidthColumn: {
    width: '100%',
  },
  fullWidthRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  categoryLabel: {
    fontWeight: 600,
    fontSize: 16,
  }
});

export default WeatherWidget;
