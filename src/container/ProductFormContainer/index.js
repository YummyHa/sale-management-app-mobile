import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionSheet, Form, Item, Input, Text, Button, Icon, View, Picker, Toast } from 'native-base';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { TouchableOpacity, Alert } from 'react-native'
import { ImagePicker, Permissions } from 'expo'

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

  _requestCameraPermission = async () => {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    camera.status === 'granted' && cameraRoll.status === 'granted'
    ? this._pickActionComplete() 
    : alert('Need camera permission to use this function!')
  }

  _pickActionComplete() {
    if (this.state.clicked === 'Take Picture') {
      this._takePhoto();
    } else if (this.state.clicked === 'Pick from gallery') {
      this._pickImage();
    }
  }

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true
    })

    this._handleImagePicked(pickerResult);
  }

  _pickImage  = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true
    })

    this._handleImagePicked(pickerResult);
  }

  _handleImagePicked = async pickerResult => {
    // update image field
  }

  onPickImageAction = () => {
    ActionSheet.show({
      options: CAMERA_OPTIONS,
      cancelButtonIndex: CANCEL_INDEX,
      title: 'Pick one'
    }, buttonIndex => {
      this.setState({ clicked: CAMERA_OPTIONS[buttonIndex] }, () => {
        this._requestCameraPermission();
      });
    })
  }

  onChangeCategory(value) {
    this.setState({ selected: value })
  }

  onAddAttr() {
    let check = false;
    for (let item of this.props.attr) {
      if (item.name === 'Attribute Name' || item.value === '') {
        check = true;
        break;
      }
    }

    if (check) {
      Toast.show({
        text: 'Attribute name and value can not be Empty',
        position: 'bottom',
        type: 'warning',
        duration: 1500
      });
    } else {
      this.props.addNewAttr();
      console.log(this.props.attr)
    }
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

    let attrRows = this.props.attr.map((r, i) => {
      return <Item key={r.name} style={styles.inputContainerStyle}>
        <TouchableOpacity style={{ width: 150 }} onPress={() => {}}>
          <Text>{r.name}</Text>
        </TouchableOpacity>
        <Input 
          placeholder='undefined value'
          onChangeText={value => this.props.updateAttr({ prop: 'value', value: value, index: i })}
          value={r.value}
        />
        <Button transparent>
          <Icon 
            name='close' 
            style={{ color: 'red' }}
            onPress={() => Alert.alert(
              'Delete', 'Are you sure you wanna delete this Attribute', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => this.props.removeAttr(i) }
              ],
              { cancelable: true }
            )}
          />
        </Button>
      </Item>
    })

    return (
      <ProductForm 
        image={this.props.image}
        onPickImageAction={() => this.onPickImageAction()}
        form={form}
        attrRows={attrRows}
        cate_name={this.props.cate_name}
        navigation={this.props.navigation}
        selected={this.state.selected}
        onChangeCategory={value => this.onChangeCategory(value)}
        categories={this.props.categories}
        destroy={() => this.props.destroy()}
        onAddAttr={() => this.onAddAttr()}
      />
    );
  }
}

const ProductFormContainerRedux = reduxForm({
  form: 'Product',
  destroyOnUnmount: false
})(ProductFormRedux)

const selector = formValueSelector('Product');

ProductFormContainer = connect(
  state => {
    const { serial, name, description, sell_price, origin_price, quantity } = 
      selector(state, 'serial', 'name', 'description', 'sell_price', 'origin_price', 'quantity');
    const { categories } = state.category;
    const { attr } = state.product_form;

    return { serial, name, description, sell_price, origin_price, quantity, categories, attr }
  },
  actions
)(ProductFormContainerRedux);

export default ProductFormContainer;
