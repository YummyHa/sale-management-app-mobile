import axios from 'axios';
import { AsyncStorage } from 'react-native';

import URL from '../../../constants/serverUrl';

export const producerFetch = () => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('userToken');
    let data = await axios.get(`${URL}/api/producers`, {
      headers: { 'x-auth': token }
    });

    dispatch({ type: 'FETCH_PRODUCER_SUCCESS', payload: data.data });
  } catch (error) {
    console.log('fetch producers failed', error.message);
  }
}

export const producerUpdateProp = ({ prop, value }) => {
  return {
    type: 'UPDATE_PRODUCER_PROPS',
    payload: {prop, value}
  };
}

export const checkProducerInfo = (message) => dispatch => {
  dispatch ({
    type: 'CHECK_PRODUCER_INFO',
    payload: message
  })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const addNewProducer = ({ name, address, phone }, cb, failcb) => async dispatch => {
  try {
    dispatch({ type: 'ADDING_NEW_PRODUCER' });
    let token = await AsyncStorage.getItem('userToken');
  
    let data = { name, address, phone };

    await sleep(2000);

    let producer = await axios({
      method: 'POST',
      url: `${URL}/api/producer`,
      data: data,
      headers: {
        'x-auth': token, 
      }
    })

    dispatch({ type: 'PRODUCER_SAVE_SUCCESS' });
    // sleep(1500);
    cb(); 
  } catch (err) {
    console.log('add producer failed', err.message);
    dispatch({ type: 'PRODUCER_SAVE_FAILED' });
    failcb();
  }
}

export const deleteProducer = (id, list) => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('userToken');

    await axios.delete(`${URL}/api/producer`, {
      data: { id: id },
      headers: { 'x-auth': token }
    })

    dispatch({ type: 'PRODUCER_DELETE', payload: list });
  } catch (err) {
    console.log('failed', err.message)
  }
}

export const onCancelProducer = (cb) => async dispatch => {
  dispatch({
    type: 'CANCEL_EDIT_PRODUCER'
  });
  cb();
}

export const parseValueToEditProducer = (producer) => async dispatch => {
  dispatch({
    type: 'PARSE_VALUE_TO_EDIT_PRODUCER',
    payload: producer
  })
}

export const updateProducer = ({ id, name, address, phone }, cb, failcb) => async dispatch => {
  try {
    dispatch({ type: 'ADDING_NEW_PRODUCER' });
    let token = await AsyncStorage.getItem('userToken');
  
    let data = { id, name, address, phone };
  
    await sleep(1000);
  
    await axios({
      method: 'PATCH',
      url: `${URL}/api/producer`,
      data: data,
      headers: {
        'x-auth': token, 
      }
    })
  
    dispatch({ type: 'PRODUCER_SAVE_SUCCESS' });
    // sleep(1500);
    cb(); 
  } catch (err) {
    console.log('edit customer failed', err.message);
    dispatch({ type: 'PRODUCER_SAVE_FAILED' });
    failcb();
  }
}

export const setSelectFromReceiptToFalse = () => dispatch => {
  dispatch({ type: 'CLEAR_SELECT_FROM_RECEIPT' });
}

export const updateProducerInReceipt = (producer, cb) => dispatch => {
  dispatch({ type: 'CLEAR_SELECT_FROM_RECEIPT' });
  dispatch({ type: 'UPDATE_PRODUCER_IN_RECEIPT', payload: producer });
  cb();
}
