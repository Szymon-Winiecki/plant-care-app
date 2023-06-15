const getQuery = (lat, lon) => {
    return `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=13&accept-language=pl`;
}

const getLocation = async (lat, lon) => {
    const query = getQuery(lat, lon);

    let locationJson;
    try {
        const response = await fetch(query);
        locationJson = await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
    console.log(locationJson);

    let city = locationJson.address.state;
    if (locationJson.address.city) city = locationJson.address.city;
    else if (locationJson.address.village) city = locationJson.address.village;
    else if (locationJson.address.suburb) city = locationJson.address.suburb;
    else if (locationJson.address.city_district) city = locationJson.address.city_district;
    else if (locationJson.address.municipality) city = locationJson.address.municipality;
    else if (locationJson.address.county) city = locationJson.address.county;
    else if (locationJson.address.region) city = locationJson.address.region;

    const location = {
        city: city,
        state: locationJson.address.state,
        country: locationJson.address.country
    }

    return location;
}

export { getLocation };