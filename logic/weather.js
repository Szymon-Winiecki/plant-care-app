import * as Icons from "../constants/icons"


const getIconForWeathercode = (weathercode) => {
    if (weathercode == 0) return Icons.sun;
    if (weathercode == 1 || weathercode == 2) return Icons.sunBehindCloud;
    if (weathercode == 3) return Icons.clouds;
    if (weathercode == 45 || weathercode == 48 || weathercode == 51 || weathercode == 53 || weathercode == 55 || weathercode == 56 || weathercode == 57) return Icons.cloudAndFog;
    if (weathercode == 61 || weathercode == 66) return Icons.lightRain;
    if (weathercode == 63) return Icons.moderateRain;
    if (weathercode == 65 || weathercode == 67) return Icons.heavyRain;
    if (weathercode == 80) return Icons.lightRainShower;
    if (weathercode == 81) return Icons.moderateRainShower;
    if (weathercode == 82) return Icons.heavyRainShower;
    if (weathercode == 71 || weathercode == 73 || weathercode == 75 || weathercode == 77 || weathercode == 85 || weathercode == 86) return Icons.snow;
    if (weathercode == 95 || weathercode == 96 || weathercode == 99) return Icons.storm;
    return Icons.cloud;
}

const getIconForTemperature = (min, max) => {
    const avg = (parseFloat(min) + parseFloat(max)) / 2;

    if (avg < 5) return Icons.thermometerLow;
    if (avg < 18) return Icons.thermometerHalf;
    return Icons.thermometerHigh;
}

export { getIconForWeathercode, getIconForTemperature };