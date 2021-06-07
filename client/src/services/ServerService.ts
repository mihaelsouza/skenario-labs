import axios from 'axios';

import { Property } from '../interfaces/Property';
import { User } from "../interfaces/User";
import { getEnrichedCoordindates } from './GeocodingAPIService';

let serverAddress: string = 'http://localhost:8080';
const { REACT_APP_SERVER_ADDRESS } = process.env;
if (REACT_APP_SERVER_ADDRESS) serverAddress = REACT_APP_SERVER_ADDRESS;

const error = (message: string | null) => {
  if (message) return new Error(message);
  else return new Error('Sorry, something went wrong. Try again!');
}

async function getUser(email: String, password: String): Promise<User> {
  try {
    const response = await axios.post(`${serverAddress}/users`, {
      email: email,
      password: password
    })
    const _user: User = await response.data;
    _user.password = '';

    return _user;
  } catch (e) {
    if (e.response.status === 403) throw error('Invalid e-mail and/or password.');
    if (e.response.status === 404) throw error('E-mail not registered.');
    else throw error(null)
  }
}

async function createUser(user: User): Promise<User> {
  try {
    const response = await axios.post(`${serverAddress}/users/register`, {...user});
    const _user: User = await response.data;
    _user.password = '';

    return _user;
  } catch (e) {
    if (e.response.status === 409) throw error('E-mail already exists.')
    else throw error(null);
  }
}

async function getUserProperties(userId: number): Promise<Property[]> {
  try {
    const response = await axios.get(`${serverAddress}/properties/${userId}`);
    const properties: Property[] = await response.data;

    return properties;
  } catch (e) {
    throw error(null);
  }
}

async function addNewProperty(userId: number, property: Partial<Property>): Promise<Property> {
  try {
    const coordinates = await getEnrichedCoordindates(property);
    property.longitude = coordinates[0];
    property.latitude = coordinates[1];

    const response = await axios.post(`${serverAddress}/properties/${userId}`, {userId, ...property});
    const newProperty: Property = response.data;

    return newProperty;
  } catch (e) {
    throw error(null);
  }
}

async function updateProperty(userId: number, propertyId: number, property: Partial<Property>): Promise<Property> {
  try {
    const coordinates = await getEnrichedCoordindates(property);
    property.longitude = coordinates[0];
    property.latitude = coordinates[1];

    const response = await axios.put(
      `${serverAddress}/properties/${userId}/${propertyId}`,
      {userId, ...property}
    );
    const newProperty: Property = response.data;

    return newProperty;
  } catch (e) {
    throw error(null);
  }
}

async function deleteProperty(userId: number, propertyId: number): Promise<void> {
  try {
    await axios.delete(`${serverAddress}/properties/${userId}/${propertyId}`);
  } catch (e) {
    throw error(null);
  }
}

export { getUser, createUser };
export { getUserProperties, addNewProperty, updateProperty, deleteProperty };