import React from "react";
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, Icon, 
  ListItem, Thumbnail, Spinner, View, Badge, Fab } from 'native-base';
import { StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { createFilter } from 'react-native-search-filter';
import { SearchBar } from 'react-native-elements';

import styles from './styles';

const KEYS_TO_FILTER = ['name', 'serial']

class Products extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      active: 'true'
    }
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  _renderItem = ({ item }) => {
    return (
      <View style={styles.itemWrapper}>
        <ListItem
          thumbnail
          style={styles.listProduct}
          onPress={() => this.props.onProductTapped(item._id)}
        >
          <Thumbnail square source={item.image === '' ? require('../../images/default-store-350x350.jpg') : { uri: item.image }} />
          <Body style={styles.noBottomBorder}>
            <Text>{item.name}</Text>
            <Text note>mã vạch: {item.serial}</Text>
            <Text note>số lượng: {item.quantity}</Text>
            {item.attributes.map((p, i) => (
              <Text note key={p._id}>{p.name}: {p.value === '' ? 'chưa có giá trị' : p.value}</Text>
            ))}
          </Body>
          <Right style={styles.noBottomBorder}>
            <Text style={styles.priceStyle}>{item.sell_price}đ</Text>
            <TouchableOpacity style={{ padding: 3, }} onPress={() => this.props.onProductPress(item)} >
              <Icon ios='ios-cart-outline' android='md-cart' style={styles.cartIconStyle} />
            </TouchableOpacity>
          </Right>
        </ListItem>
      </View>
    );
  }

  render() {
    const filteredProducts = this.props.data.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTER))
    return (
      <Container style={styles.container}>
        <StatusBar translucent={false} />

        {/* Header */}
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon active ios='ios-menu' android='md-menu' style={styles.headerIconStyle} />
            </Button>
          </Left>

          <Body>
            <Title>Sản phẩm</Title>
          </Body>

          <Right>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')} style={{ flexDirection: 'row', alignContent: 'flex-end' }}>
              <Text style={styles.headerIconStyle}>Giỏ({this.props.totalCart})</Text>
            </TouchableOpacity>
          </Right>
        </Header>

        <SearchBar 
          lightTheme
          onChangeText={(term) => this.searchUpdated(term)}
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          placeholder='Tìm hàng...'
          containerStyle={{ backgroundColor: '#F8F8F8', borderTopWidth: 0 }}
          inputStyle={{ backgroundColor: '#fff' }}
        />

        {/* Content */}
        <ScrollView>
          {filteredProducts.map(item => this._renderItem({item}))}
        </ScrollView>
      </Container>
    ); 
  }
}

export default Products;
