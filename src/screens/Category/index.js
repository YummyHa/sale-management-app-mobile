import React from 'react'
import { Header, Left, Body, Right, Container, Content, Text, Button, Icon, Title } from 'native-base'

export default class CategoryScreen extends React.PureComponent {
  render() {
    return(
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon ios='ios-arrow-back' android='md-arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Category</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Text>This is Category Screen</Text>
        </Content>
      </Container>
    )
  }
}