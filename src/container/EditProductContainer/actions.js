import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import axios from 'axios';
import Moment from 'moment';

import URL from '../../../constants/serverUrl';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const finishEditProduct = () => async dispatch => {
  dispatch({ type: 'EDIT_PRODUCT_FINISHED' })
}

async function uploadImageAsync(uri, name) {
  const response = await fetch(uri);
  const blob = await response.blob();
  let now = Moment().toISOString();
  let newName = now+name;
  const ref = firebase.storage().ref().child(newName);
  const snapshot = await ref.put(blob);
  return snapshot.ref.getDownloadURL();
}

export const editProduct = ({id, serial, name, description, sell_price, origin_price, quantity, attr, image, cate_id}, callback, failcb) => async dispatch => {
  try {
    dispatch({ type: 'CREATE_PRODUCT_START' })
    let token = await AsyncStorage.getItem('userToken');

    // Upload image to Fireabase Cloud Storage
    if (image !== '') {
      uploadUrl = await uploadImageAsync(image, token)
    } else {
      uploadUrl = '';
    }

    const data = {
      id,
      serial,
      name,
      description,
      sell_price: sell_price,
      origin_price: origin_price,
      quantity: quantity,
      attributes: attr,
      image: uploadUrl,
      cate_id,
    }    

    await sleep(2000);

    let product = await axios({
      method: 'PATCH',
      url: `${URL}/api/product`,
      data: data,
      headers: {
        'x-auth': token, 
      }
    })

    dispatch({ type: 'SAVE_PRODUCT_FINISHED' })
    callback();
  } catch (error) {
    failcb();
    dispatch({ type: 'CREATE_PRODUCT_FAILED' })
    console.log(error);
  }
}
