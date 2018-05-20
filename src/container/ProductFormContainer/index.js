import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionSheet, Form, Item, Input, Text, Button, Icon, View, Picker } from 'native-base';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { TouchableOpacity } from 'react-native'

import NavigationService from '../../NavigationService';

import ProductForm from '../../screens/ProductForm';
import * as actions from './actions';
import styles from '../../screens/ProductForm/styles';

const CAMERA_OPTIONS = ['Take Picture', 'Pick from gallery', 'Cancel'];
const CANCEL_INDEX = 2;

const required = value => (value ? undefined : 'Required');

class ProductFormRedux extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = { clicked: null, selected: 'nan' }
  }

  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    let labelName = '';
    let placeHolder = '';
    let keyboardType = '';

    switch (input.name) {
      case 'serial': 
        labelName = 'Serial:';
        placeHolder = '123456';
        keyboardType = 'default';
        break;
      case 'name': 
        labelName = 'Name:';
        placeHolder = 'Product A';
        keyboardType = 'default';
        break;
      case 'description': 
        labelName = 'Description:';
        placeHolder = 'No description';
        keyboardType = 'default';
        break;
      case 'origin_price': 
        labelName = 'Original Price:';
        placeHolder = '0';
        keyboardType = 'numeric';
        break;
      case 'sell_price': 
        labelName = 'Sell Price:';
        placeHolder = '0';
        keyboardType = 'numeric';
        break;
      case 'quantity': 
        labelName = 'Quantity:';
        placeHolder = '0';
        keyboardType = 'numeric';
        break;
      default:
        labelName = 'undefined';
        placeHolder = 'nothing...';
        keyboardType = 'default';
        break;
    }
    
    return (
      <Item error={error && touched} style={styles.inputContainerStyle}>
        <Text style={styles.labelStyle}>{labelName}</Text>
        <Input 
          style={styles.inputTextStyle}
          placeholder={placeHolder}
          keyboardType={keyboardType}
          placeholderTextColor='#cecece'
          {...input}
        />
        {input.name === 'serial' ? <Button transparent onPress={() => NavigationService.navigate('BarCodeScanner')}>
          <Icon ios='ios-barcode-outline' android='md-barcode' style={styles.barcodeIconStyle} />
        </Button> : <View></View>}
      </Item>
    );
  }

  onPickImageAction = () => {
    ActionSheet.show({
      options: CAMERA_OPTIONS,
      cancelButtonIndex: CANCEL_INDEX,
      title: 'Pick one'
    }, buttonIndex => {
      this.setState({ clicked: CAMERA_OPTIONS[buttonIndex] }, () => {
        // do something when pick is done
      });
    })
  }

  onChangeCategory(value) {
    this.setState({ selected: value })
  }

  render() {
    const form = (
      <Form style={styles.formStyle}>
        <Field 
          name='serial'
          component={this.renderInput}
          validate={[required]}
        />
        <Field 
          name='name'
          component={this.renderInput}
          validate={[required]}
        />
        <Field 
          name='description'
          component={this.renderInput}
          validate={[required]}
        />
        <Field 
          name='quantity'
          component={this.renderInput}
          validate={[required]}
        />
        <Field 
          name='origin_price'
          component={this.renderInput}
          validate={[required]}
        />
        <Field 
          name='sell_price'
          component={this.renderInput}
          validate={[required]}
        />
      </Form>
    )

    return (
      <ProductForm 
        image={this.props.image}
        onPickImageAction={() => this.onPickImageAction()}
        form={form}
        cate_name={this.props.cate_name}
        navigation={this.props.navigation}
        selected={this.state.selected}
        onChangeCategory={value => this.onChangeCategory(value)}
        categories={this.props.categories}
      />
    );
  }
}

const ProductFormContainerRedux = reduxForm({
  form: 'Product'
})(ProductFormRedux)

const selector = formValueSelector('Product');

ProductFormContainer = connect(
  state => {
    const { serial, name, description, sell_price, origin_price, quantity } = 
      selector(state, 'serial', 'name', 'description', 'sell_price', 'origin_price', 'quantity');
    const { cate_id, cate_name } = state.add_product;
    const { categories } = state.category;

    return { serial, name, description, sell_price, origin_price, quantity, cate_id, cate_name }
  },
  actions
)(ProductFormContainerRedux);

export default ProductFormContainer;
