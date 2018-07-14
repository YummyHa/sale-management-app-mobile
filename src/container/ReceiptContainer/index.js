import React, { Component } from 'react';

import Receipt from '../../screens/Receipt';

class ReceiptContainer extends Component {
  render() {
    return <Receipt navigation={this.props.navigation} />
  }
}

export default ReceiptContainer;
