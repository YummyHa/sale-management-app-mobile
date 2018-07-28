import React, { Component } from "react";
import { Platform, Modal, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, 
  Icon, View, ListItem, Thumbnail, Subtitle, Input } from 'native-base';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { SearchBar } from 'react-native-elements';

import styles from './styles';
import Colors from "../../../constants/Colors";
import URL from '../../../constants/serverUrl';

const KEYS_TO_FILTER = ['name', 'serial']
const { width, height } = Dimensions.get('window');

class Receipt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  renderSearchModal() {
    const filteredProducts = this.props.products.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTER))
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.toggleSearchModal()} >
              <Icon active name="arrow-back" style={{ color: Platform.OS === 'ios' ? Colors.tintColor : '#fff' }} />
            </Button>
          </Left>
          <Body><Title>Tìm hàng</Title></Body>
          <Right />
        </Header>
      
        {/* <SearchInput 
          onChangeText={(term) => this.searchUpdated(term)}
          style={{ padding: 10, margin: 10, borderColor: '#CCC', borderWidth: 1 }}
          placeholder="Tìm kiếm hàng"
        /> */}
        <SearchBar 
          lightTheme
          onChangeText={(term) => this.searchUpdated(term)}
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          placeholder='Tìm kiếm hàng'
          containerStyle={{ backgroundColor: '#F8F8F8', borderTopWidth: 0 }}
          inputStyle={{ backgroundColor: '#fff' }}
        />

        <ScrollView>
          {filteredProducts.map(item => {
            return (
              <View style={styles.itemWrapper}>
                <ListItem
                  thumbnail
                  style={styles.listProduct}
                  onPress={() => this.props.addProductToReceiptList(item)}
                >
                  <Thumbnail square source={item.image === '' ? require('../../images/default-store-350x350.jpg') : { uri: item.image }} />
                  <Body style={styles.noBottomBorder}>
                    <Text>{item.name}</Text>
                    <Text note>mã vạch: {item.serial}</Text>
                    <Text note>số lượng: {item.quantity}</Text>
                  </Body>
                  <Right style={styles.noBottomBorder}>
                    <Text style={styles.priceStyle}>{item.sell_price}đ</Text>
                  </Right>
                </ListItem>
              </View>
            )
          })}
        </ScrollView>
      </Container>
    );
  }

  renderItem = ({ item }) => {
    let { width } = Dimensions.get('window');
    let index = _.findIndex(this.props.list, l => l._id === item._id);
    return (
      <View style={styles.listItem}>
        <View style={{ width: width/3, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 3 }}>{item.name}</Text>
          <Text note>{item.serial}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width/2 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 2 }}>
            <Text note>SL:</Text>
            <Input
              style={{ marginRight: 5, marginLeft: 5, flex: 1, marginBottom: 3, textAlign: 'center'}}
              placeholder="0"
              keyboardType='numeric'
              onChangeText={value => this.props.onUpdateQty(index, value)}
              onEndEditing={() => {
                if (item.quantity === 0) {
                  let list = this.props.list.slice();
                  ~index && list.splice(index, 1);
                  this.props.removeItemList(list);
                }
              }}
              value={item.quantity.toString()}
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 4 }}>
            <Text note>Giá(đ):</Text>
            <Input
              style={{ marginRight: 5, marginLeft: 5, flex: 1, marginBottom: 3, textAlign: 'center' }}
              placeholder="0"
              keyboardType='numeric'
              onChangeText={value => this.props.onUpdatePrice(index, value)}
              value={item.price.toString()}
            />
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{ padding: 3 }} onPress={() => {
            let list = this.props.list.slice();
            ~index && list.splice(index, 1);
            this.props.removeItemList(list);
          }}>
            <Text style={{ color: Colors.secondTintColor, fontSize: 12 }}>Xoá</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Header>
        <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()} >
            <Icon active name="arrow-back" style={{ color: Platform.OS === 'ios' ? Colors.tintColor : '#fff' }} />
          </Button>
        </Left>
        <Body>
          <Title>Phiếu nhập</Title>
          <Subtitle>{this.props.totalItem} sản phẩm</Subtitle>
        </Body>
        <Right />
        </Header>

        <Modal 
          animationType='slide'
          visible={this.props.searchModalVisible}
          onRequestClose={() => {}}
        >
          {this.renderSearchModal()}
        </Modal>

        <TouchableOpacity onPress={() => this.props.onSelectProducer()} style={styles.searchBoxStyle}>
          <Icon ios='ios-people-outline' android='md-people' style={{ marginRight: 8, marginLeft: 3 }} />
          <Text style={{ color: Colors.textColor }}>{this.props.producer === null ? 'Chọn nhà cung cấp' : this.props.producer.name}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.toggleSearchModal()} style={styles.searchBoxStyle}>
          <Icon ios='ios-search-outline' android='md-search' style={{ marginRight: 8, marginLeft: 3 }} />
          <Text style={{ color: Colors.textColor }}>Tìm hàng để nhập</Text>
        </TouchableOpacity>

        <Text style={{ margin: 5, marginLeft: 10 }} note>Danh sách mặt hàng</Text>

        <Content padder>
          <View style={{ backgroundColor: '#fff' }}>
            <FlatList 
              data={this.props.list}
              renderItem={this.renderItem}
              keyExtractor={item => item._id}
            />
          </View>
        </Content>

        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 5, margin: 5 }}>
          <Text style={{ marginLeft: 5, marginRight: 5 }}>Ghi chú:</Text>
          <Input
            style={{ marginRight: 5, marginLeft: 5, flex: 1 }}
            placeholder="Nhập ghi chú"
            onChangeText={value => this.props.onUpdateNote(value)}
            value={this.props.note}
          />
        </View>

        <View style={styles.total}>
          <Text style={{ color: '#fff' }}>Tổng cộng: {this.props.total} đ</Text>
        </View>

        <Button full onPress={() => this.props.onAddNewReceipt()} style={{ backgroundColor: Colors.tintColor }}>
          <Text>Hoàn thành</Text>
        </Button>
      </Container>
    ); 
  }
}

export default Receipt;
