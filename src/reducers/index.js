import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import productsReducer from '../container/ProductContainer/reducer';
import addProductReducer from '../container/AddProductContainer/reducer';
import categoryReducer from '../container/CategoryContainer/reducer';

export default combineReducers({
  form: formReducer,
  product_list: productsReducer,
  add_product: addProductReducer,
  category: categoryReducer
});
