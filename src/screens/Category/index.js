import React from 'react'
import { Header, Left, Body, Right, Container, Content, Text, Button, Icon, Title,
  ListItem, Spinner } from 'native-base'
import { Platform, FlatList } from 'react-native'

import styles from './styles'

export default class CategoryScreen extends React.PureComponent {
  _renderItem = ({ item }) => {
    return (
      <ListItem
        icon
        style={styles.listProduct}
      >
        <Left>
          <Icon name='arrow-forward' style={styles.itemIcon} />
        </Left>
        <Body>
          <Text>{item.name}</Text>
        </Body>
        <Right>
          <Button transparent onPress={() => {}}>
            <Icon name='close' style={{ color: 'red' }} />
          </Button>
        </Right>
      </ListItem>
    );
  }

  render() {
    return(
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon active ios='ios-arrow-back' android='md-arrow-back' style={styles.headerIconStyle} />
              {Platform.OS === 'ios' ? <Text style={styles.headerText}>Back</Text> : <View />}
            </Button>
          </Left>
          <Body>
            <Title>Category</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => {}}>
              <Text style={styles.headerText}>Add</Text>
            </Button>
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