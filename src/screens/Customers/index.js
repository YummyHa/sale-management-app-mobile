import React, { Component } from "react";
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, Icon,
  Form, Item, Spinner, Input, ListItem, Thumbnail, View } from 'native-base';
import { Modal, FlatList, TouchableOpacity } from 'react-native';

import styles from './styles';
import Colors from "../../../constants/Colors";

class Customers extends Component {
  renderCustomerForm() {
    const { inputTextStyle, inputContainerStyle, textStyle, formStyle } = styles;
    return (
      <View>
        <Form style={formStyle}>
          <Item style={inputContainerStyle}>
            <Text style={textStyle}>Tên(*)</Text>
            <Input
              style={inputTextStyle}
              placeholder='Nhập tên'
              placeholderTextColor='#cecece'
              onChangeText={text => this.props.customerUpdate({ prop: 'customerName', value: text })}
              value={this.props.customerName}
            />
          </Item>
          <Item style={inputContainerStyle}>
            <Text style={textStyle}>Địa chỉ</Text>
            <Input
              style={inputTextStyle}
              placeholder='Nhập địa chỉ'
              placeholderTextColor='#cecece'
              onChangeText={text => this.props.customerUpdate({ prop: 'customerAddress', value: text })}
              value={this.props.customerAddress}
            />
          </Item>
          <Item style={inputContainerStyle}>
            <Text style={textStyle}>SĐT(*)</Text>
            <Input
              style={inputTextStyle}
              placeholder='Nhập số điện thoại'
              placeholderTextColor='#cecece'
              keyboardType='phone-pad'
              onChangeText={text => this.props.customerUpdate({ prop: 'customerPhone', value: text })}
              value={this.props.customerPhone}
            />
          </Item>
          <Item style={inputContainerStyle}>
            <Text style={textStyle}>Zalo</Text>
            <Input
              style={inputTextStyle}
              placeholder='Nhập số điện thoại zalo'
              placeholderTextColor='#cecece'
              keyboardType='phone-pad'
              onChangeText={text => this.props.customerUpdate({ prop: 'customerZalo', value: text })}
              value={this.props.customerZalo}
            />
          </Item>
          <Item style={inputContainerStyle}>
            <Text style={textStyle}>Facebook</Text>
            <Input
              style={inputTextStyle}
              placeholder='Nhập link facebook'
              placeholderTextColor='#cecece'
              onChangeText={text => this.props.customerUpdate({ prop: 'customerFacebook', value: text })}
              value={this.props.customerFacebook}
            />
          </Item>
        </Form>
      </View>
    );
  }

  renderEditCustomerModal() {
    const { containerStyle } = styles;

    return (
      <Container style={containerStyle}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.onCancelEdit()} >
              <Icon active name="close" style={{ color: Colors.tintColor }} />
              <Text style={{color: Colors.tintColor}}>Huỷ</Text>
            </Button>
          </Left>

          <Body>
            <Title>Sửa khách</Title>
          </Body>

          <Right />
        </Header>

        <Content>
          <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
            <Text style={{ color: Colors.secondTintColor }}>{this.props.check}</Text>
          </View>
          {this.renderCustomerForm()}

          {this.props.isSavingCustomer ? <Button
            info
            full
            rounded
            style={{ marginTop: 20, marginLeft: 10, marginRight: 10, backgroundColor: Colors.tintColor }}
          >
            <Spinner color='#fff' />
          </Button> 
          : <Button
              full
              rounded
              style={{ marginTop: 20, marginLeft: 10, marginRight: 10, backgroundColor: Colors.tintColor }}
              onPress={() => this.props.onSaveCustomer()}
            >
              <Text style={{ color: '#fff' }}>Lưu</Text>
            </Button>}
        </Content>
      </Container>
    );
  }

  renderAddCustomerModal() {
    const { containerStyle } = styles;

    return (
      <Container style={containerStyle}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.toggleAddModal()} >
              <Icon active name="close" style={{ color: Colors.tintColor }} />
              <Text style={{color: Colors.tintColor}}>Huỷ</Text>
            </Button>
          </Left>

          <Body>
            <Title>Thêm khách</Title>
          </Body>

          <Right />
        </Header>

        <Content>
          <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
            <Text style={{ color: Colors.secondTintColor }}>{this.props.check}</Text>
          </View>
          {this.renderCustomerForm()}

          {this.props.isAddingCustomer ? <Button
            info
            full
            rounded
            style={{ marginTop: 20, marginLeft: 10, marginRight: 10, backgroundColor: Colors.tintColor }}
          >
            <Spinner color='#fff' />
          </Button> 
          : <Button
              full
              rounded
              style={{ marginTop: 20, marginLeft: 10, marginRight: 10, backgroundColor: Colors.tintColor }}
              onPress={() => this.props.onAddNewCustomer()}
            >
              <Text style={{ color: '#fff' }}>Thêm</Text>
            </Button>}
        </Content>
      </Container>
    );
  }

  renderItem = ({ item }) => {
    return (
      <View style={{ borderColor: Colors.textColor, borderWidth: 0.2, borderStyle: 'dashed', borderRadius: 5, margin: 10, marginBottom: 0 }}>
        <ListItem
          avatar
          onPress={() => this.props.updateCustomerNameInOrderingList(item._id)}
        >
          <Left>
            <Thumbnail source={require('../../images/customer-default.png')} />
          </Left>

          <Body style={{ borderBottomWidth: 0, borderBottomColor: 'transparent' }}>
            <Text>{item.name}</Text>
            {item.address !== '' ? <Text note>địa chỉ: {item.address}</Text> : <Text note>Địa chỉ trống...</Text>}
            {item.phone !== '' ? <Text note>sđt: {item.phone}</Text> : <Text note>Số điện thoại trống...</Text>}
            {item.fb !== '' ? <Text note>facebook: {item.fb}</Text> : <View />}
            {item.zalo !== '' ? <Text note>zalo: {item.zalo}</Text> : <View />}
          </Body>

          <Right style={{ borderBottomWidth: 0, borderBottomColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.props.onEditCustomer(item._id)} style={{ padding: 4, marginBottom: 10 }}>
              <Text style={{ color: Colors.tintColor  }}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onRemoveCustomer(item._id)} style={{ padding: 4 }}>
              <Text style={{ color: Colors.secondTintColor }}>Xoá</Text>
            </TouchableOpacity>
          </Right>
        </ListItem>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.goBack()}>
              <Icon active name="arrow-back" style={{ color: Colors.tintColor }} />
              <Text style={{ color: Colors.tintColor }}>Lùi</Text>
            </Button>
          </Left>

          <Body>
            <Title>Khách hàng</Title>
          </Body>

          <Right>
            <TouchableOpacity
              transparent
              onPress={() => this.props.toggleAddModal()}
            >
              <Text uppercase={false} style={{ color: Colors.tintColor }}>Thêm</Text>
            </TouchableOpacity>
          </Right>
        </Header>

        {/* screen popup to add new Customer */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.customerModalVisible}
        >
          {this.renderAddCustomerModal()}
        </Modal>
        {/* end */}

        {/* screen popup to edit Customer */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.EditModalVisible}
        >
          {this.renderEditCustomerModal()}
        </Modal>
        {/* end */}

        <Content style={styles.listStyle}>
          <FlatList
            data={this.props.data}
            renderItem={this.renderItem}
            keyExtractor={item => item._id}
          />
        </Content>
      </Container>
    );
  }
}

export default Customers;
