import axios from 'axios';
import { User } from "../interfaces/User";

let serverAddress = 'http://localhost:8080';

const { REACT_APP_SERVER_ADDRESS } = process.env;
if (REACT_APP_SERVER_ADDRESS) serverAddress = REACT_APP_SERVER_ADDRESS;

const error = (message: string) => {
  return new Error(message);
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
    else throw error('Sorry, something went wrong. Try again!')
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
    else throw error('Sorry, something went wrong. Try again!');
  }
}

export { getUser, createUser };