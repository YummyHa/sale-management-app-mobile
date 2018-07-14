import { AsyncStorage } from 'react-native'
import axios from 'axios'

import URL from '../../../constants/serverUrl';

export const fetchUser = () => async dispatch => {
  const token = await AsyncStorage.getItem('userToken');

  var user = await axios.get(`${URL}/api/users/me`, {
    headers: { 'x-auth': token }
  });

  dispatch({ type: 'GET_USER_DONE', payload: user.data });
}