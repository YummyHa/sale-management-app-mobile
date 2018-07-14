import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-native';

import CategoryScreen from '../../screens/Category';

import * as actions from './actions';

class CategoryContainer extends Component {
  render() {
    return (
      <CategoryScreen 
        data={this.props.categories}
        isFetching={this.props.isFetchingCategories}
        navigation={this.props.navigation}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { categories, isFetchingCategories } = state.category;

  return { categories, isFetchingCategories }
}

export default connect(mapStateToProps, actions)(CategoryContainer);
