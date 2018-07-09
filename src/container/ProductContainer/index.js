import React, { Component } from 'react';
import { connect } from 'react-redux';

import Products from '../../screens/Products';

import * as actions from './actions';

class ProductContainer extends Component {
  async componentDidMount() {
    await this.props.fetchListProducts();
    await this.props.fetchListCategories();
  }

  render() {
    return <Products 
      data={this.props.products}
      isFetching={this.props.isFetchingProducts}
      navigation={this.props.navigation}
    />
  }
}

const mapStateToProps = (state) => {
  const { products, isFetchingProducts } = state.product_list;

  return { products, isFetchingProducts }
}

export default connect(mapStateToProps, actions)(ProductContainer);
