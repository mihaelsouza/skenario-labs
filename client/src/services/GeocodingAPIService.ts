import axios from 'axios';
import { Property } from "../interfaces/Property";

let apiKey: string = '&apiKey=';
const { REACT_APP_GEOCODING_APIKEY } = process.env;
if (REACT_APP_GEOCODING_APIKEY) apiKey += REACT_APP_GEOCODING_APIKEY;

const baseUrl = 'https://api.geoapify.com/v1/geocode/search?text=';

async function getEnrichedCoordindates(property: Partial<Property>): Promise<number[]> {
  try {
    const street = property.street?.replaceAll(' ', '%20');
    const postalCode = property.postalCode?.replaceAll(' ', '%20');
    const city = property.city?.replaceAll(' ', '%20');
    const municipality = property.municipality?.replaceAll(' ', '%20');
    const country = property.country?.replaceAll(' ', '%20');

    const searchUrl = `${baseUrl}${street}${city}${postalCode}${municipality}${country}${apiKey}`;
    const response = await axios.get(searchUrl);
    const geoJSON = response.data;

    return geoJSON.features[0].geometry.coordinates;
  } catch (e) {
    throw new Error(e.response.message)
  }
}

export { getEnrichedCoordindates };