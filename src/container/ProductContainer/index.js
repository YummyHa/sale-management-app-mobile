import React, { Component } from 'react';
import { connect } from 'react-redux';

import Products from '../../screens/Products';

import * as actions from './actions';

class ProductContainer extends Component {
  async componentDidMount() {
    await this.props.fetchListProducts();
    await this.props.fetchListCategories();
  }

  addProductToOrder = async (item) => {
    await this.props.addProductToOrderingList(item, this.props.orderingList);
    console.log(this.props.orderingTotalItems)
  }

  render() {
    return <Products 
      data={this.props.products}
      isFetching={this.props.isFetchingProducts}
      navigation={this.props.navigation}
      onProductPress={(item) => this.addProductToOrder(item)}
      totalCart={this.props.orderingTotalItems}
    />
  }
}

const mapStateToProps = (state) => {
  const { products, isFetchingProducts } = state.product_list;
  const { orderingList, orderingTotalItems } = state.cart;

  return { products, isFetchingProducts, orderingList, orderingTotalItems }
}

export default connect(mapStateToProps, actions)(ProductContainer);
