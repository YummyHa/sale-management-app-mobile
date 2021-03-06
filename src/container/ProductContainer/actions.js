import axios from 'axios';
import _ from 'lodash';
import { AsyncStorage } from 'react-native';

import URL from '../../../constants/serverUrl';

export const fetchUser = () => async dispatch => {
  const token = await AsyncStorage.getItem('userToken');

  var user = await axios.get(`${URL}/api/users/me`, {
    headers: { 'x-auth': token }
  });

  dispatch({ type: 'GET_USER_DONE', payload: user.data });
}

export const fetchMessages = (room) => async dispatch => {
  var msgs = await axios.get(`${URL}/api/messages/${room}`);

  dispatch({ type: 'FETCH_MESSAGES', payload: msgs.data });
}

export const fetchListProducts = () => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('userToken');
    let data = await axios.get(`${URL}/api/products`, {
      headers: { 'x-auth': token }
    });

    if (!data.data) {
      dispatch({ type: 'FETCH_PRODUCT_FAILED' })
    } else {
      dispatch({ type: 'FETCH_PRODUCT_SUCCESS', payload: data.data })
    }
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCT_FAILED' })
  }
}

export const fetchListCategories = () => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('userToken');
    let data = await axios.get(`${URL}/api/categories`, {
      headers: { 'x-auth': token }
    });

    if (!data.data) {
      dispatch({ type: 'FETCH_CATEGORY_FAILED' })
    } else {
      dispatch({ type: 'FETCH_CATEGORY_SUCCESS', payload: data.data })
    }
  } catch (error) {
    dispatch({ type: 'FETCH_CATEGORY_FAILED' })
  }
}

export const fetchListOrders = () => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('userToken');
    let data = await axios.get(`${URL}/api/orders`, {
      headers: { 'x-auth': token }
    });

    dispatch({ type: 'FETCH_ORDER_SUCCESS', payload: data.data });
  } catch (error) {
    console.log('fetch order failed', error.message);
  }
}

export const fetchListReceipts = () => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('userToken');
    let data = await axios.get(`${URL}/api/receipts`, {
      headers: { 'x-auth': token }
    });

    dispatch({ type: 'FETCH_RECEIPT_SUCCESS', payload: data.data });
  } catch (error) {
    console.log('fetch receipt failed', error.message);
  }
}

export const addProductToOrderingList = ({item, list}, cb) => dispatch => {
  let index = _.findIndex(list, p => p._id === item._id);
  let data = {
    _id: item._id,
    quantity: 1,
    origin_qty: item.quantity - 1,
    real_qty: item.quantity,
    name: item.name,
    sell_price: item.sell_price,
    origin_price: item.origin_price,
  };

  if (index > -1) {
    if (list[index].origin_qty <= 0) {
      cb();
    } else {
      dispatch({ type: 'UPDATE_ORDER_QUANTITY_PLUS', payload: index }) 
    }
  } else {
    dispatch({ type: 'ADD_NEW_ORDERLIST_SUCCESS', payload: data })
  }

  dispatch({ type: 'UPDATE_TOTAL_ORDER_AMOUNT' });
  dispatch({ type: 'MONEY_CHANGE_CHANGED' })
}

export const gotoProductDetail = (product, callback) => async dispatch => {
  dispatch({ type: 'FETCH_PRODUCT_IN_DETAIL', payload: product });
  callback();
}
