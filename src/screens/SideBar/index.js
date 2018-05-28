import React from 'react'
import { Text, Container, List, ListItem, Content } from 'native-base'

const routes = [
  {
    route: 'ProductList',
    caption: 'Home',
  },
  {
    route: 'Category',
    caption: 'Category',
  },
  {
    route: 'AddProduct',
    caption: 'Create Product',
  },
  {
    route: 'ProductList',
    caption: 'Goods Receipt',
  },
  {
    route: 'ProductList',
    caption: 'Customer',
  },
  {
    route: 'ProductList',
    caption: 'Attribute',
  }
]

export default class SideBar extends React.PureComponent {
  render() {
    return (
      <Container>
        <Content>
          <List 
            style={{ marginTop: 40 }}
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => {
                    this.props.navigation.navigate(data.route);
                  }}
                >
                  <Text>{data.caption}</Text>
                </ListItem>
              )
            }}
          />
        </Content>
      </Container>
    );
  }
}
