import React, { Component } from 'react';
import { connect } from 'react-redux';

import Bills from '../../screens/Bills';
import * as actions from './actions';

class BillContainer extends Component {
  render() {
    return <Bills 
      data={this.props.orders}
    />
  }
}

const mapStateToProps = state => {
  const { orders } = state.bill;

  return { orders }
}

export default connect(mapStateToProps, actions)(BillContainer);
