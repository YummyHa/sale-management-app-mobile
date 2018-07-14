import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';

import ProductDetailScreen from '../../screens/ProductDetail';

import { parseInitProductFormValues, deleteProduct } from './actions';
import { fetchListProducts } from '../ProductContainer/actions';

class ProductDetailContainer extends Component {
  async onEdit() {
    await this.props.parseInitProductFormValues(this.props.product);
    this.props.navigation.navigate('EditProduct');
  }

  async onDelete() {
    var id = this.props.product._id;
    Alert.alert(
      'Cảnh báo',
      'Bạn có chắc muốn xoá sản phẩm này chứ?',
      [
        {text: 'Không', style: 'cancel'},
        {text: 'Có', onPress: async () => { 
          await this.props.deleteProduct(id, () => this.props.navigation.goBack()); 
          this.props.fetchListProducts(); 
        }}
      ],
      {cancelable: false}
    )
  }

  render() {
    return (
      <ProductDetailScreen 
        data={this.props.product}
        navigation={this.props.navigation}
        onEdit={() => this.onEdit()}
        onDelete={() => this.onDelete()}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { product } = state.product_detail;

  return { product }
}

const mapDispatchToProps = {
  parseInitProductFormValues,
  deleteProduct,
  fetchListProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailContainer);
