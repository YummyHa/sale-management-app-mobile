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
    console.log('add category failed', err.message);
    dispatch({ type: 'CATEGORY_SAVE_FAILED' });
    failcb();
  }
}

export const parseValueToEdit = (category) => async dispatch => {
  dispatch({ type: 'PARSE_VALUE_TO_EDIT_CATEGORY', payload: category });
} 

export const editCategory = ({ _id, name, desc, attribute }, cb, failcb) => async dispatch => {
  try {
    dispatch({ type: 'ADDING_NEW_CATEGORY' });
    let token = await AsyncStorage.getItem('userToken');
  
    let data = { id: _id, name, description: desc, attributes: attribute };

    let category = await axios({
      method: 'PATCH',
      url: `${URL}/api/category`,
      data: data,
      headers: {
        'x-auth': token, 
      }
    })

    dispatch({ type: 'CATEGORY_SAVE_SUCCESS' });
    sleep(1500);
    cb(); 
  } catch (err) {
    console.log('edit category failed', err.message);
    dispatch({ type: 'CATEGORY_SAVE_FAILED' });
    failcb();
  }
}

export const deleteCategory = (id, callback, failcb) => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('userToken');
    let data = { id };
    await axios({
      method: 'DELETE',
      url: `${URL}/api/category`,
      data: data,
      headers: {
        'x-auth': token, 
      }
    });

    callback();
  } catch (err) {
    console.log('delete category failed', err.message);
    failcb();
  }
}
