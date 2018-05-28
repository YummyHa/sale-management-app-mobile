import React from "react";
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, Icon, 
  ListItem, Thumbnail, Spinner } from 'native-base';
import { Platform } from 'react-native';

import styles from './styles';

class AddProduct extends React.PureComponent {
  render() {
    return (
      <Container style={styles.container}>
        {/* Header */}
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon active ios='ios-arrow-back' android='md-arrow-back' style={styles.headerIconStyle} />
              {Platform.OS === 'ios' ? <Text style={styles.headerBackText}>Back</Text> : <View />}
            </Button>
          </Left>

          <Body>
            <Title>Add Product</Title>
          </Body>

          <Right />
        </Header>

        {/* Content */}
        <Content padder>
          {this.props.productForm}
          <Button block onPress={() => this.props.onCreateProduct()}>
            <Text>Create</Text>
          </Button>
        </Content>
      </Container>
    ); 
  }
}

export default AddProduct;
