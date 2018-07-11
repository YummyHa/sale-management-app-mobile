import axios from 'axios';
import { AsyncStorage } from 'react-native';

import URL from '../../../constants/serverUrl';

export const customerFetch = () => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('userToken');
    let data = await axios.get(`${URL}/api/customers`, {
      headers: { 'x-auth': token }
    });

    dispatch({ type: 'FETCH_CUSTOMER_SUCCESS', payload: data.data });
  } catch (error) {
    console.log('fetch customer failed', error.message);
  }
}

export const customerUpdateProp = ({ prop, value }) => {
  return {
    type: 'UPDATE_CUSTOMER_PROPS',
    payload: {prop, value}
  };
}

export const checkCustomerInfo = (message) => dispatch => {
  dispatch ({
    type: 'CHECK_CUSTOMER_INFO',
    payload: message
  })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const addNewCustomer = ({ name, address, phone, fb, zalo }, cb, failcb) => async dispatch => {
  try {
    dispatch({ type: 'ADDING_NEW_CUSTOMER' });
    let token = await AsyncStorage.getItem('userToken');
  
    let data = { name, address, phone, fb, zalo };

    await sleep(2000);

    let customer = await axios({
      method: 'POST',
      url: `${URL}/api/customer`,
      data: data,
      headers: {
        'x-auth': token, 
      }
    })

    dispatch({ type: 'CUSTOMER_SAVE_SUCCESS' });
    sleep(1500);
    cb(); 
  } catch (err) {
    console.log('add customer failed', err.message);
    dispatch({ type: 'CUSTOMER_SAVE_FAILED' });
    failcb();
  }
}

export const deleteCustomer = (id, list) => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('userToken');

    await axios.delete(`${URL}/api/customer`, {
      data: { id: id },
      headers: { 'x-auth': token }
    })

    dispatch({ type: 'CUSTOMERS_DELETE', payload: list });
  } catch (err) {
    console.log('failed', err.message)
  }
}

export const onCancelCustomer = (cb) => async dispatch => {
  dispatch({
    type: 'CANCEL_EDIT_CUSTOMER'
  });
  cb();
}

export const parseValueToEdit = (customer) => async dispatch => {
  dispatch({
    type: 'PARSE_VALUE_TO_EDIT',
    payload: customer
  })
}

export const updateCustomer = ({ id, name, address, phone, fb, zalo }, cb, failcb) => async dispatch => {
  try {
    dispatch({ type: 'ADDING_NEW_CUSTOMER' });
    let token = await AsyncStorage.getItem('userToken');
  
    let data = { id, name, address, phone, fb, zalo };
  
    await sleep(1000);
  
    let customer = await axios({
      method: 'PATCH',
      url: `${URL}/api/customer`,
      data: data,
      headers: {
        'x-auth': token, 
      }
    })
  
    dispatch({ type: 'CUSTOMER_SAVE_SUCCESS' });
    sleep(1500);
    cb(); 
  } catch (err) {
    console.log('edit customer failed', err.message);
    dispatch({ type: 'CUSTOMER_SAVE_FAILED' });
    failcb();
  }
}

export const setCheckFromOrderToFalse = () => dispatch => {
  dispatch({ type: 'CLEAR_CHECK_FROM_CART' });
}

export const updateCustomerInCart = (customer, cb) => dispatch => {
  dispatch({ type: 'CLEAR_CHECK_FROM_CART' });
  dispatch({ type: 'UPDATE_CUSTOMER_IN_CART', payload: customer });
  cb();
}
