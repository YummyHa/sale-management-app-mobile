import axios from 'axios';
import _ from 'lodash';
import { AsyncStorage } from 'react-native';

import URL from '../../../constants/serverUrl';

export const fetchListBranches = () => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('userToken');
    let data = await axios.get(`${URL}/api/getbranchs`, {
      headers: { 'x-auth': token }
    });

    console.log(data.data);

    dispatch({ type: 'FETCH_BRANCHES_SUCCESS', payload: data.data })
  } catch (error) {
    console.log('fetch branches failed with message:', error.message);
  }
}

export const updateUser = ({ prop, value }) => async dispatch => {
  dispatch({
    type: 'USER_REGISTER_UPDATE',
    payload: { prop, value }
  })
}