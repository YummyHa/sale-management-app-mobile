import axios from 'axios';
import _ from 'lodash';
import { AsyncStorage } from 'react-native';

import URL from '../../../constants/serverUrl';

export const addProductToReceiptList = ({item, list}, cb) => async dispatch => {
  let index = _.findIndex(list, p => p._id === item._id);
  let data = {
    _id: item._id,
    name: item.name,
    serial: item.serial,
    quantity: 1,
    current_quantity: item.quantity,
    price: item.origin_price
  };

  if (index > -1) {
    cb();
  } else {
    dispatch({ type: 'ADD_NEW_RECEIPT_LIST_SUCCESS', payload: data })
    cb();
  }

  dispatch({ type: 'UPDATE_TOTAL_RECEIPT_AMOUNT' });
}


export const updateReceiptQuantity = (val, i) => async dispatch => {
  if (i > -1) {
    dispatch({ type: 'UPDATE_RECEIPT_QUANTITY', payload: { index: i, value: val } });
    dispatch({ type: 'UPDATE_TOTAL_RECEIPT_AMOUNT' });
  } 
}

export const updateReceiptPrice = (val, i) => async dispatch => {
  if (i > -1) {
    dispatch({ type: 'UPDATE_RECEIPT_PRICE', payload: { index: i, value: val } });
    dispatch({ type: 'UPDATE_TOTAL_RECEIPT_AMOUNT' });
  } 
}

export const removeItemInReceiptList = (list) => dispatch => {
  dispatch({ type: 'REMOVE_RECEIPT_IN_LIST', payload: list });
  dispatch({ type: 'UPDATE_TOTAL_RECEIPT_AMOUNT' });
}

export const updateNote = (value) => dispatch => {
  dispatch({ type: 'UPDATE_NOTE_IN_RECEIPT_LIST', payload: value })
}

export const onSelectProducer = (cb) => dispatch => {
  dispatch({ type: 'SELECT_PRODUCER_FROM_RECEIPT' });
  cb();
}

export const addNewReceipt = ({ producer, receiptList, total, note }, callback, failcb) => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    var products = [];

    _.forEach(receiptList, (value) => {
      let product = {
        _product: value._id,
        qty: value.quantity,
        price: value.price
      }
      products.push(product);
    });

    const data = {
      _producer: _.isEmpty(producer) ? undefined : producer._id,
      products: products,
      total: total,
      note: note
    }

    await axios({
      method: 'POST',
      url: `${URL}/api/receipt`,
      data: data,
      headers: { 'x-auth': token }
    });

    // update product
    _.forEach(receiptList, async (value) => {
      let prod = {
        id: value._id,
        quantity: value.current_quantity + value.quantity,
        origin_price: value.price
      }
      await axios({
        method: 'PATCH',
        url: `${URL}/api/product`,
        data: prod,
        headers: {
          'x-auth': token, 
        }
      })
    });

    dispatch({ type: 'ADD_RECEIPT_SUCCESS' });
    callback();
  } catch (err) {
    console.log('Err', err.message);
    failcb();
  }
}
