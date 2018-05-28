import axios from 'axios';
import { AsyncStorage } from 'react-native'

export const fetchListCategories = () => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('userToken');
    let data = await axios.get('http://localhost:3000/api/categories', {
      headers: { 'x-auth': token }
    });

    if (!data.data.categories) {
      dispatch({ type: 'FETCH_CATEGORY_FAILED' })
    } else {
      dispatch({ type: 'FETCH_CATEGORY_SUCCESS', payload: data.data.categories })
    }
  } catch (error) {
    dispatch({ type: 'FETCH_CATEGORY_FAILED' })
  }
}
