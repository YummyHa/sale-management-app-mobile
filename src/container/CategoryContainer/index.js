import React, { Component } from 'react';
import { connect } from 'react-redux';

import CategoryScreen from '../../screens/Category';

import * as actions from './actions';

class CategoryContainer extends Component {
  render() {
    return (
      <CategoryScreen 
        navigation={this.props.navigation}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { } = state.category;

  return { }
}

export default connect(mapStateToProps, actions)(CategoryContainer);
