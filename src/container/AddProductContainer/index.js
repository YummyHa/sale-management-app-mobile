import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddProduct from '../../screens/AddProduct';
import ProductFormContainer from '../ProductFormContainer';

import * as actions from './actions';

class AddProductContainer extends Component {
  onCreateProduct = () => {
    // add product with api
  }

  render() {
    return (
      <AddProduct 
        navigation={this.props.navigation}
        onCreateProduct={() => this.onCreateProduct()}
        productForm={<ProductFormContainer {...this.props} />}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { image } = state.add_product;

  return { image }
}

export default connect(mapStateToProps, actions)(AddProductContainer);
