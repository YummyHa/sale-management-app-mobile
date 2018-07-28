import React, { Component } from 'react';
import { connect } from 'react-redux';

import Bills from '../../screens/Bills';
import * as actions from './actions';

class BillContainer extends Component {
  state = {
    selectedTab: 0
  }

  changeTab(tab) {
    this.setState({ selectedTab: tab });
  }

  render() {
    return <Bills 
      data={this.props.orders}
      data2={this.props.receipts}
      selectedTab={this.state.selectedTab}
      changeTab={(tab) => this.changeTab(tab)}
    />
  }
}

const mapStateToProps = state => {
  const { orders, receipts } = state.bill;

  return { orders, receipts }
}

export default connect(mapStateToProps, actions)(BillContainer);
