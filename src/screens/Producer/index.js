import React, { Component } from "react";
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, Icon,
  Form, Item, Spinner, Input, ListItem, Thumbnail, View } from 'native-base';
import { Modal, FlatList, TouchableOpacity, Platform } from 'react-native';
import { createFilter } from 'react-native-search-filter';
import { SearchBar } from 'react-native-elements';

import styles from './styles';
import Colors from "../../../constants/Colors";

const KEYS_TO_FILTER = ['name', 'address', 'phone']

class Producer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  renderProducerForm() {
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
              onChangeText={text => this.props.producerUpdate({ prop: 'name', value: text })}
              value={this.props.name}
            />
          </Item>
          <Item style={inputContainerStyle}>
            <Text style={textStyle}>Địa chỉ(*)</Text>
            <Input
              style={inputTextStyle}
              placeholder='Nhập địa chỉ'
              placeholderTextColor='#cecece'
              onChangeText={text => this.props.producerUpdate({ prop: 'address', value: text })}
              value={this.props.address}
            />
          </Item>
          <Item style={inputContainerStyle}>
            <Text style={textStyle}>SĐT(*)</Text>
            <Input
              style={inputTextStyle}
              placeholder='Nhập số điện thoại'
              placeholderTextColor='#cecece'
              keyboardType='phone-pad'
              onChangeText={text => this.props.producerUpdate({ prop: 'phone', value: text })}
              value={this.props.phone}
            />
          </Item>
        </Form>
      </View>
    );
  }

  renderEditProducerModal() {
    const { containerStyle } = styles;

    return (
      <Container style={containerStyle}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.onCancelEdit()} >
              <Icon name="close" style={styles.headerIconStyle} />
            </Button>
          </Left>

          <Body>
            <Title>Sửa nhà cung cấp</Title>
          </Body>

          <Right />
        </Header>

        <Content>
          <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
            <Text style={{ color: Colors.secondTintColor }}>{this.props.check}</Text>
          </View>
          {this.renderProducerForm()}

          {this.props.isSavingProducer ? <Button
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
              onPress={() => this.props.onSaveProducer()}
            >
              <Text style={{ color: '#fff' }}>Lưu</Text>
            </Button>}
        </Content>
      </Container>
    );
  }

  renderAddProducerModal() {
    const { containerStyle } = styles;

    return (
      <Container style={containerStyle}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.toggleAddModal()} >
              <Icon name="close" style={styles.headerIconStyle} />
            </Button>
          </Left>

          <Body>
            <Title>Thêm nhà cung cấp</Title>
          </Body>

          <Right />
        </Header>

        <Content>
          <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
            <Text style={{ color: Colors.secondTintColor }}>{this.props.check}</Text>
          </View>
          {this.renderProducerForm()}

          {this.props.isSavingProducer ? <Button
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
              onPress={() => this.props.onAddNewProducer()}
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
          onPress={() => this.props.updateProducerNameinReceipt(item._id)}
        >
          <Left>
            <Thumbnail source={require('../../images/customer-default.png')} />
          </Left>

          <Body style={{ borderBottomWidth: 0, borderBottomColor: 'transparent' }}>
            <Text>{item.name}</Text>
            {item.address !== '' ? <Text note>địa chỉ: {item.address}</Text> : <Text note>Địa chỉ trống...</Text>}
            {item.phone !== '' ? <Text note>sđt: {item.phone}</Text> : <Text note>Số điện thoại trống...</Text>}
          </Body>

          <Right style={{ borderBottomWidth: 0, borderBottomColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.props.onEditProducer(item._id)} style={{ padding: 4, marginBottom: 10 }}>
              <Text style={{ color: Colors.tintColor  }}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onRemoveProducer(item._id)} style={{ padding: 4 }}>
              <Text style={{ color: Colors.secondTintColor }}>Xoá</Text>
            </TouchableOpacity>
          </Right>
        </ListItem>
      </View>
    );
  }

  render() {
    const filteredProducers = this.props.data.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTER))
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.goBack()}>
              <Icon active name="arrow-back" style={styles.headerIconStyle} />
              {Platform.OS === 'ios' ? <Text style={styles.headerIconStyle}>Lùi</Text> : null}
            </Button>
          </Left>

          <Body>
            <Title>Nhà cung cấp</Title>
          </Body>

          <Right>
            <TouchableOpacity
              transparent
              onPress={() => this.props.toggleAddModal()}
            >
              <Text uppercase={false} style={styles.headerIconStyle}>Thêm</Text>
            </TouchableOpacity>
          </Right>
        </Header>

        <SearchBar 
          lightTheme
          onChangeText={(term) => this.searchUpdated(term)}
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          placeholder='Tìm kiếm...'
          containerStyle={{ backgroundColor: '#F8F8F8', borderTopWidth: 0 }}
          inputStyle={{ backgroundColor: '#fff' }}
        />

        {/* screen popup to add new Customer */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.addModalVisible}
          onRequestClose={() => {}}
        >
          {this.renderAddProducerModal()}
        </Modal>
        {/* end */}

        {/* screen popup to edit Customer */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.editModalVisible}
          onRequestClose={() => {}}
        >
          {this.renderEditProducerModal()}
        </Modal>
        {/* end */}

        <Content style={styles.listStyle}>
          {filteredProducers.map(item => this.renderItem({item}))}
        </Content>
      </Container>
    );
  }
}

export default Producer;
