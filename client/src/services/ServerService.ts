import axios from 'axios';
import { User } from "../interfaces/User";

let serverAddress = 'http://localhost:8080';

const { REACT_APP_SERVER_ADDRESS } = process.env;
if (REACT_APP_SERVER_ADDRESS) serverAddress = REACT_APP_SERVER_ADDRESS;

async function getUser(email: String, password: String): Promise<User> {
  try {
    const response = await axios.post(`${serverAddress}/users`, {
      email: email,
      password: password
    })

    return await response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export { getUser, };