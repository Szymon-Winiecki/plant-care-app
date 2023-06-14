import { StyleSheet, Text, View, StatusBar } from 'react-native';

import { Colors } from '../../constants/colors';
import DailyWeather from './DailyWeather';
import { ScrollView } from 'react-native';

const WeatherWidget = props => {

  const renderDays = () => {

    if (!props.days) {
      return [];
    }

    let list = [];

    props.days.forEach(day => {
      list.push(
        <DailyWeather weather={day} />
      );
    });

    return list;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Pogoda na najbliższe dni (Poznań): </Text>
      <ScrollView horizontal>
        {renderDays()}
      </ScrollView>
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
  }
});

export default WeatherWidget;
