import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import productsReducer from '../container/ProductContainer/reducer';
import addProductReducer from '../container/AddProductContainer/reducer';
import categoryReducer from '../container/CategoryContainer/reducer';
import productForm from '../container/ProductFormContainer/reducer';
import Cart from '../container/CartContainer/reducer';
import Customer from '../container/CustomerContainer/reducer';
import ProductDetail from '../container/ProductDetailContainer/reducer';
import EditProdcut from '../container/EditProductContainer/reducer';
import Summary from '../container/SummaryContainer/reducer';
import Bill from '../container/BillContainer/reducer';
import Sidebar from '../container/SidebarContainer/reducer';
import Auth from '../container/LoginContainer/reducer';
import Receipt from '../container/ReceiptContainer/reducer';
import Producer from '../container/ProducerContainer/reducer';
import Message from '../container/ContactContainer/reducer';

export default combineReducers({
  auth: Auth,
  form: formReducer,
  product_list: productsReducer,
  add_product: addProductReducer,
  product_form: productForm,
  category: categoryReducer,
  cart: Cart,
  customer: Customer,
  product_detail: ProductDetail,
  edit_product: EditProdcut,
  summary: Summary,
  bill: Bill,
  sidebar: Sidebar,
  receipt: Receipt,
  producer: Producer,
  message: Message,
});
