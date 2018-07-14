import axios from 'axios';
import { AsyncStorage } from 'react-native';

import URL from '../../../constants/serverUrl';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const parseInitProductFormValues = (product) => async dispatch => {
  var initFormValue = {
    serial: product.serial, 
    name: product.name, 
    description: product.description, 
    sell_price: product.sell_price.toString(), 
    origin_price: product.origin_price.toString(), 
    quantity: product.quantity.toString()
  }
  dispatch({ type: 'PARSE_INIT_FORM_VALUES', payload: initFormValue });
  dispatch({ type: 'PARSE_IN_MORE_PRODUCT_VALUES', payload: product });
}

export const deleteProduct = (id, cb) => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('userToken');

    await axios.delete(`${URL}/api/product`, {
      data: { id: id },
      headers: { 'x-auth': token }
    })

    cb();
  } catch (err) {
    console.log('failed', err.message)
  }
} 
