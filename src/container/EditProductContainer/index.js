import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'native-base';

import EditProduct from '../../screens/EditProduct';
import ProductFormContainer from '../ProductFormContainer';
import { getFormValues } from 'redux-form';

import { finishEditProduct, editProduct } from './actions';
import { fetchListProducts } from '../ProductContainer/actions';

class EditProductContainer extends Component {
  onSaveProduct = async () => {
    var { serial, name, description, sell_price, origin_price, quantity } = this.props.productFormStates;
    var { attr, image, cate_id } = this.props;

    var id = this.props.product._id;

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
      await this.props.editProduct({id, serial, name, description, sell_price, origin_price, quantity, attr, image, cate_id}, () => {
        this.props.navigation.navigate('ProductHome');
      }, () => this.showToast('Có lỗi xảy ra!'));
      this.props.fetchListProducts();
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

  onGoBack() {
    this.props.finishEditProduct();
    this.props.navigation.goBack();
  }

  render() {
    return ( 
      <EditProduct 
        navigation={this.props.navigation}
        onSaveProduct={() => this.onSaveProduct()}
        productForm={<ProductFormContainer {...this.props} />}
        isLoading={this.props.isCreatingProduct}
        onGoBack={() => this.onGoBack()}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const productFormStates = getFormValues('Product')(state);
  const { attr, image, cate_id } = state.product_form;
  const { isCreatingProduct } = state.add_product;
  const { product } = state.product_detail;

  return { productFormStates, attr, image, cate_id, isCreatingProduct, product }
}

const mapDispatchToProps = {
  editProduct,
  finishEditProduct,
  fetchListProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProductContainer);
