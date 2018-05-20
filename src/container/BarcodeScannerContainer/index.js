import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';

import BarcodeScanner from '../../screens/BarcodeScanner';

class BarcodeScannerContainer extends React.PureComponent {
  _handleBarCodeRead = data => {
    this.props.changeFieldValue('serial', data);
    this.props.navigation.goBack();
  }

  render() {
    return <BarcodeScanner
      _handleBarCodeRead={this._handleBarCodeRead}
      navigation={this.props.navigation}
    />
  }
}

const BarcodeScannerContainerRedux = reduxForm({
  form: 'Product'
}, mapDispatchToProps = (dispatch) => {
  return {
    changeFieldValue: (field, value) => {
      dispatch(change(form, field, value))
    }
  }
})(BarcodeScannerContainer);

export default BarcodeScannerContainerRedux;
