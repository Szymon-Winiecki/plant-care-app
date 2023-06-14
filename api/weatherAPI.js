
const getQuery = (lat, lon, days) => {
    return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_hours&forecast_days=${days}&timezone=auto`;
}

const getWeather = async (lat, lon, days) => {
    const query = getQuery(lat, lon, days);
    let weatherJson;
    try {
        const response = await fetch(query);
        weatherJson = await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }


    const daysWeather = [];

    for (let i = 0; i < days; i++) {
        const day = {
            date: weatherJson.daily.time[i],

            temperatureMin: weatherJson.daily.temperature_2m_min[i],
            temperatureMax: weatherJson.daily.temperature_2m_max[i],
            precipationSum: weatherJson.daily.precipitation_sum[i],
            precipationHours: weatherJson.daily.precipitation_hours[i],
            weathercode: weatherJson.daily.weathercode[i],

            temperatureUnit: weatherJson.daily_units.temperature_2m_max,
            precipationSumUnit: weatherJson.daily_units.precipitation_sum,
            precipationHoursUnit: weatherJson.daily_units.precipitation_hours,
        }

        daysWeather.push(day);
    }

    return daysWeather;
}

export { getWeather };