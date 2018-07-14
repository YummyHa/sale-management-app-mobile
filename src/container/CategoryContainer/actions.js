import axios from 'axios';
import { AsyncStorage } from 'react-native'

import URL from '../../../constants/serverUrl';

export const categoryUpdate = ({ prop, value }) => {
  return {
    type: 'UPDATE_CATEGORY_PROPS',
    payload: {prop, value}
  };
}

export const updateAttrList = (temp) => async dispatch => {
  dispatch({ type: 'UPDATE_ATTR_LIST', payload: temp });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const addNewCategory = ({ name, desc, attribute }, cb, failcb) => async dispatch => {
  try {
    dispatch({ type: 'ADDING_NEW_CATEGORY' });
    let token = await AsyncStorage.getItem('userToken');
  
    let data = { name, description: desc, attributes: attribute };

    let category = await axios({
      method: 'POST',
      url: `${URL}/api/categories`,
      data: data,
      headers: {
        'x-auth': token, 
      }
    })

    dispatch({ type: 'CATEGORY_SAVE_SUCCESS' });
    sleep(1500);
    cb(); 
  } catch (err) {
    console.log('add customer failed', err.message);
    dispatch({ type: 'CATEGORY_SAVE_FAILED' });
    failcb();
  }
}
