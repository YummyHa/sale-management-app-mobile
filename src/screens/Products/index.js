import React from "react";
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, Icon, 
  ListItem, Thumbnail, Spinner } from 'native-base';
import { FlatList, StatusBar } from 'react-native';

import styles from './styles';

class Products extends React.PureComponent {
  _renderItem = ({ item }) => {
    return (
      <ListItem
        thumbnail
        style={styles.listProduct}
      >
        <Thumbnail square source={require("../../images/default-store-350x350.jpg")} />
        <Body>
          <Text>{item.name}</Text>
          <Text note>serial: {item.serial}</Text>
          <Text note>quantity: {item.quantity}</Text>
          {item.attributes.map((p, i) => (
            <Text note key={p._id}>{p.name}: {p.value}</Text>
          ))}
        </Body>
        <Right>
          <Text style={styles.priceStyle}>${item.sell_price[0].value}</Text>
        </Right>
      </ListItem>
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
            <Title>Products</Title>
          </Body>

          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate('AddProduct')}>
              <Text style={styles.headerIconStyle}>Add</Text>
            </Button>
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
      </Container>
    ); 
  }
}

export default Products;
