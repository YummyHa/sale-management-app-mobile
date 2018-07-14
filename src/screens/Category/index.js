import React from 'react'
import { Header, Left, Body, Right, Container, Content, Text, Button, Icon, Title,
  ListItem, Spinner, View } from 'native-base'
import { Platform, FlatList, TouchableOpacity } from 'react-native'

import styles from './styles'
import Colors from '../../../constants/Colors';

export default class CategoryScreen extends React.PureComponent {
  _renderItem = ({ item }) => {
    return (
      <View>
        <ListItem style={{ marginLeft: 0, marginRight: 0 }} onPress={() => {}}>
          <Body>
            <Text>{item.name}</Text>
            <Text note style={{ marginTop: 5 }}>{item.description}</Text>
            <View style={{ marginTop: 5, flexDirection: 'row', marginLeft: 8 }}>
              <Text note>Thuộc tính: </Text>
              {item.attributes.map((r, i) => (
                <Text key={i} note>#{r} </Text>
              ))}
            </View>
          </Body>
          <Right>
            <TouchableOpacity style={{ padding: 3 }} onPress={() => {}}>
              <Text style={{ color: Colors.secondTintColor }}>Xoá</Text>
            </TouchableOpacity>
          </Right>
        </ListItem>
      </View>
    );
  }

  render() {
    return(
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon active ios='ios-arrow-back' android='md-arrow-back' style={styles.headerIconStyle} />
              {Platform.OS === 'ios' ? <Text style={styles.headerText}>Lùi</Text> : <View />}
            </Button>
          </Left>
          <Body>
            <Title>Loại sản phẩm</Title>
          </Body>
          <Right>
            <TouchableOpacity style={{ padding: 3 }} onPress={() => {}}>
              <Text style={styles.headerText}>Thêm</Text>
            </TouchableOpacity>
          </Right>
        </Header>

        <Content padder>
          {this.props.isFetching ? <Spinner /> : 
            <FlatList 
              data={this.props.data}
              renderItem={this._renderItem}
              keyExtractor={item => item._id}
            />}
        </Content>
      </Container>
    )
  }
}