import React from "react";
import { View, Icon, Item, Text, Input, Button, Form, Header, Left, Title, Right } from 'native-base';
import { TouchableOpacity, Image, Platform, Picker } from 'react-native'

import NavigationService from '../../NavigationService'
import styles from './styles';

class ProductForm extends React.PureComponent {
  render() {
    makeList = (categories) => {
      if (categories !== []) {
        d = categories.map((item, i) => (
          <Picker.Item label={item.name} value={item._id} key={i} />
        ));
        d.unshift(<Picker.Item label='Pick a category' value={null} key='nan' />);
      } else {
        d = <Picker.Item label='No Category' value={null} key='nan' />
      }

      return d
    }

    return (
      <View>
        {/* Image Section */}
        <TouchableOpacity onPress={() => this.props.onPickImageAction()}>
          <View style={styles.imageContainerStyle}>
            {!this.props.image
              ? <Icon name='camera' style={styles.imageIconStyle} />
              : <Image source={{ uri: this.props.image }} style={styles.imageStyle} />
            }
          </View>
        </TouchableOpacity>
        
        {/* Form Section */}
        <View style={styles.borderContainer}>
          {this.props.form}
        </View>

        <View style={styles.divideView} />

        {/* Category Section */}
        <View style={styles.category}>
          <Text style={styles.categoryLabel}>Category:</Text>
          <Picker
            mode='dropdown'
            style={{ width: 150 }}
            selectedValue={this.props.selected}
            onValueChange={this.props.onChangeCategory}
          >
            {makeList(this.props.categories)}            
          </Picker>
          <Button transparent onPress={() => NavigationService.navigate('Category')}>
            <Icon ios='ios-add-circle-outline' android='md-add-circle' style={styles.barcodeIconStyle} />
          </Button>
        </View>

        <View style={styles.divideView} />

        {/* Attributes Section */}
        <Form style={styles.borderContainer}>
          {this.props.attrRows}

          {/* <Item style={styles.attributeStyles}>
            <Icon style={styles.addAttrIcon} ios='ios-add-circle-outline' android='md-add-circle'/>
            <TouchableOpacity onPress={() => this.props.onAddAttr()}>
              <Text style={styles.addAttrText}>Add attribute</Text>
            </TouchableOpacity>
          </Item> */}
        </Form>

        <View style={styles.divideView} />
      </View>
    ); 
  }
}

export default ProductForm;


