import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'native-base';

import AddProduct from '../../screens/AddProduct';
import ProductFormContainer from '../ProductFormContainer';
import { getFormValues } from 'redux-form';

import * as actions from './actions';

class AddProductContainer extends Component {
  onCreateProduct = () => {
    var { serial, name, description, sell_price, origin_price, quantity } = this.props.productFormStates;
    var { attr, image, cate_id } = this.props;

    if (!description) description = '';
    if (!sell_price) sell_price = 0;
    if (!origin_price) origin_price = 0;
    if (!quantity) quantity = 0;
    if (!image) image = '';

    if (!serial) {
      this.showToast('Vui lòng nhập số seri');
    } else if (!name) {
      this.showToast('Vui lòng nhập tên sản phẩm');
    } else {
      // call action create product
      this.props.createProduct({serial, name, description, sell_price, origin_price, quantity, attr, image, cate_id}, () => {
        this.props.navigation.navigate('ProductHome');
      }, () => this.showToast('Có lỗi xảy ra!'));
    }
  }

  showToast = (message) => {
    Toast.show({
      text: message,
      position: 'bottom',
      type: 'warning',
      duration: 1500
    });
  }

  render() {
    return (
      <AddProduct 
        navigation={this.props.navigation}
        onCreateProduct={() => this.onCreateProduct()}
        productForm={<ProductFormContainer {...this.props} />}
        isLoading={this.props.isCreatingProduct}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const productFormStates = getFormValues('Product')(state);
  const { attr, image, cate_id } = state.product_form;
  const { isCreatingProduct } = state.add_product;

  return { productFormStates, attr, image, cate_id, isCreatingProduct }
}

export default connect(mapStateToProps, actions)(AddProductContainer);
