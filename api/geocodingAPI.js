const getQuery = (lat, lon) => {
    return `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=13`;
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
    // console.log(locationJson);
    const location = {
        city: locationJson.address.city ? locationJson.address.city : (locationJson.address.village ? locationJson.address.village : (locationJson.address.suburb ? locationJson.address.suburb : locationJson.address.municipality)),
        state: locationJson.address.state,
        country: locationJson.address.country
    }

    return location;
}

export { getLocation };