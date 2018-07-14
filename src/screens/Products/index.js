import React from "react";
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, Icon, 
  ListItem, Thumbnail, Spinner, View, Badge, Fab } from 'native-base';
import { FlatList, StatusBar, TouchableOpacity } from 'react-native';

import styles from './styles';

class Products extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      active: 'true'
    }
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
            <Text style={styles.priceStyle}>${item.sell_price}</Text>
            <TouchableOpacity style={{ padding: 3, }} onPress={() => this.props.onProductPress(item)} >
              <Icon ios='ios-cart-outline' android='md-cart' style={styles.cartIconStyle} />
            </TouchableOpacity>
          </Right>
        </ListItem>
      </View>
    );
  }

  render() {
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

        {/* Content */}
        <Content>
          {this.props.isFetching ? <Spinner /> : 
          <FlatList 
            data={this.props.data}
            renderItem={this._renderItem}
            keyExtractor={item => item._id}
          />}
        </Content>
            
        <TouchableOpacity>
          <Fab
            onPress={() => this.props.navigation.navigate('AddProduct')}
            style={styles.addProductFAB}
          >
            <Icon name='add' style={{ fontSize: 34 }} />
          </Fab>
        </TouchableOpacity>
      </Container>
    ); 
  }
}

export default Products;
