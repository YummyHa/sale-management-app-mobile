import React from "react";
import { View, Icon, Item, Text, Input, Button, Form, Picker, Header, Left, Title, Right } from 'native-base';
import { TouchableOpacity, Image, Platform } from 'react-native'

import NavigationService from '../../NavigationService'
import styles from './styles';

class ProductForm extends React.PureComponent {
  render() {
    makeList = (categories) => {
      if (!categories) {
        return <Picker.Item label='Empty' value='null' />
      } else {
        d = categories.map((item, i) => (
          <Picker.Item label={item.name} value={item._id} key={i} />
        ))
        if (Platform.OS === 'android') {
          d.unshift(<Picker.Item label='Select' />)
        }
        return d;
      }
    }

    return (
      <View>
        <TouchableOpacity onPress={() => this.props.onPickImageAction()}>
          <View style={styles.imageContainerStyle}>
            {!this.props.image
              ? <Icon name='camera' style={styles.imageIconStyle} />
              : <Image source={{ uri: this.props.image }} style={styles.imageStyle} />
            }
          </View>
        </TouchableOpacity>

        {this.props.form}

        <View style={styles.category}>
          <Text style={styles.categoryLabel}>Category:</Text>
          <Form>
            <Picker
              iosHeader='Pick Category'
              mode='dropdown'
              iosIcon={<Icon name='ios-arrow-down-outline' />}
              style={{ width: 150, marginLeft: -15 }}
              selectedValue={this.props.selected}
              onValueChange={this.props.onChangeCategory}
            >
              <Picker.Item label='Pick a Category' value='nan' />
              {makeList(this.props.categories)}            
            </Picker>
          </Form>
          <Button transparent onPress={() => NavigationService.navigate('Category')}>
            <Icon name='add' style={styles.barcodeIconStyle} />
          </Button>
        </View>
      </View>
    ); 
  }
}

export default ProductForm;


