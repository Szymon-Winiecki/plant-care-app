import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';

import { Colors } from '../../constants/colors';
import { commonStyles } from '../../styles/common';
import * as Icons from '../../constants/icons';
import { getIconForTemperature, getIconForWeathercode } from '../../logic/weather';


const DailyWeather = props => {

    return (
        <View style={styles.container}>
            <Image style={styles.bigIcon} source={getIconForWeathercode(props.weather.weathercode)}></Image>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={styles.smallIcon} source={getIconForTemperature(props.weather.temperatureMin, props.weather.temperatureMax)}></Image>
                <View>
                    <Text>{parseInt(props.weather.temperatureMax)} {props.weather.temperatureUnit}</Text>
                    <Text>{parseInt(props.weather.temperatureMin)} {props.weather.temperatureUnit}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={styles.smallIcon} source={Icons.droplet}></Image>
                <Text>{props.weather.precipationSum} {props.weather.precipationSumUnit}</Text>
            </View>
            <Text>{props.weather.date}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.tertiary,
        borderRadius: 20,
        padding: 20,
        margin: 5,
    },
    smallIcon: {
        width: 30,
        height: 30
    },
    bigIcon: {
        width: 60,
        height: 60
    }
});

export default DailyWeather;
