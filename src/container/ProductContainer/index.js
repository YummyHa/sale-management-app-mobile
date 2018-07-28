import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Toast } from 'native-base';

import Products from '../../screens/Products';

import * as actions from './actions';

class ProductContainer extends Component {
  async componentDidMount() {
    await this.props.fetchUser();
    await this.props.fetchListProducts();
    await this.props.fetchListCategories();
    await this.props.fetchListOrders();
    await this.props.fetchListReceipts();
    var { _id, _admin } = this.props.user;
    var result = this.sortString(_id, _admin)
    console.log(result);
    this.props.fetchMessages(result);
  }

  sortString(a, b) {
    let check = a.localeCompare(b);
    let result = check < 0 ? a+'-'+b : b+'-'+a;
    return result; 
  }

  showToast = (message) => {
    Toast.show({
      text: message,
      position: 'bottom',
      duration: 1500
    });
  }

  addProductToOrder = async (item) => {
    if (item.quantity === 0) {
      this.showToast('Sản phẩm đã hết hàng');
    } else {
      var list = this.props.orderingList;
      await this.props.addProductToOrderingList({item, list}, 
        () => this.showToast('Không thể thêm sản phẩm này nhiều hơn!'));
    }
  }

  onProductTapped(id) {
    var product = _.find(this.props.products, { '_id': id });
    this.props.gotoProductDetail(product, () => this.props.navigation.navigate('ProductDetail'));
  }

  render() {
    return <Products 
      data={this.props.products}
      isFetching={this.props.isFetchingProducts}
      navigation={this.props.navigation}
      onProductPress={(item) => this.addProductToOrder(item)}
      totalCart={this.props.orderingTotalItems}
      onProductTapped={id => this.onProductTapped(id)}
    />
  }
}

const mapStateToProps = (state) => {
  const { products, isFetchingProducts } = state.product_list;
  const { orderingList, orderingTotalItems } = state.cart;
  const { user } = state.sidebar;

  return { products, isFetchingProducts, orderingList, orderingTotalItems, user }
}

export default connect(mapStateToProps, actions)(ProductContainer);
