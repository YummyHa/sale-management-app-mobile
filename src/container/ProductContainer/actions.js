import axios from 'axios';
import { AsyncStorage } from 'react-native'

export const fetchListProducts = () => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('userToken');
    let data = await axios.get('http://localhost:3000/api/products', {
      headers: { 'x-auth': token }
    });

    if (!data.data.products) {
      dispatch({ type: 'FETCH_PRODUCT_FAILED' })
    } else {
      dispatch({ type: 'FETCH_PRODUCT_SUCCESS', payload: data.data.products })
    }
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCT_FAILED' })
  }
}
