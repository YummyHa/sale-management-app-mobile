import axios from 'axios';
import _ from 'lodash';
import { AsyncStorage } from 'react-native';

import URL from '../../../constants/serverUrl';

export const updateOrderQuantity = (val, i) => dispatch => {
  if (i > -1) {
    dispatch({ type: 'UPDATE_ORDER_QUANTITY', payload: { index: i, value: val } });
    dispatch({ type: 'UPDATE_TOTAL_ORDER_AMOUNT' });
    dispatch({ type: 'MONEY_CHANGE_CHANGED' })
  } 
}

export const updateOrderQuantityByButton = (type, index) => dispatch => {
  type === 'plus' ? dispatch({ type: 'UPDATE_ORDER_QUANTITY_PLUS', payload: index }) : dispatch({ type: 'UPDATE_ORDER_QUANTITY_MINUS', payload: index });
  dispatch({ type: 'UPDATE_TOTAL_ORDER_AMOUNT' });
  dispatch({ type: 'MONEY_CHANGE_CHANGED' })
}

export const removeItemInOrderingList = (list) => dispatch => {
  dispatch({ type: 'UPDATE_ORDER_LIST', payload: list });
  dispatch({ type: 'UPDATE_TOTAL_ORDER_AMOUNT' });
  dispatch({ type: 'MONEY_CHANGE_CHANGED' })
}

export const discountChange = (value) => dispatch => {
  dispatch({ type: 'DISCOUNT_CHANGED', payload: value }) 
  dispatch({ type: 'DISCOUNT_TOTAL' })
  dispatch({ type: 'MONEY_CHANGE_CHANGED' })
}

export const updateOrginTotal = (value) => dispatch => {
  dispatch({ type: 'UPDATE_ORGIN_TOTAL' })
  dispatch({ type: 'MONEY_CHANGE_CHANGED' })
}

export const customerPaidChanged = (value) => dispatch => {
  dispatch({ type: 'PAID_MONEY_CHANGED', payload: value })
  dispatch({ type: 'MONEY_CHANGE_CHANGED' })
}

export const afterChangeTotalAgain = () => dispatch => {
  dispatch({ type: 'MONEY_CHANGE_CHANGED' })
}

export const onSelectCustomer = (cb) => dispatch => {
  dispatch({ type: 'SELECT_CUSTOMER_FROM_ORDER' });
  cb();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const addNewOrder = ({ customer, orderingList, total, paidmoney, discount }, callback, failcb, cb1) => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    var products = [];

    _.forEach(orderingList, (value) => {
      let product = {
        _product: value._id,
        qty: value.quantity,
        price: value.sell_price,
        price_origin: value.origin_price,
      }
      products.push(product);
    });

    const data = {
      _customer: _.isEmpty(customer) ? undefined : customer._id,
      products: products,
      total: total,
      paid: paidmoney,
      saleOff: discount,
      status: paidmoney === 0 ? 'Chưa thanh toán' : paidmoney >= total ? 'Đã thanh toán' : 'Còn nợ'
    }

    var order = await axios({
      method: 'POST',
      url: `${URL}/api/order`,
      data: data,
      headers: { 'x-auth': token }
    });

    // update product
    _.forEach(orderingList, async (value) => {
      let prod = {
        id: value._id,
        quantity: value.real_qty - value.quantity,
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

    dispatch({ type: 'ADD_ORDER_SUCCESS' });
    callback();
    cb1();
  } catch (err) {
    console.log('Err', err.message);
    cb1();
    await sleep(1000);
    failcb();
  }
}
