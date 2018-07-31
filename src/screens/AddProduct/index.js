import React from "react";
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, Icon, 
  ListItem, Thumbnail, Spinner, View } from 'native-base';
import { Platform, TouchableOpacity } from 'react-native';
import LoadingSpinner from 'react-native-loading-spinner-overlay';
 
import styles from './styles';

class AddProduct extends React.PureComponent {
  render() {
    return (
      <Container style={styles.container}>
        <LoadingSpinner visible={this.props.isLoading} animation='fade' />
        {/* Header */}
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.onGoBack()}>
              <Icon active ios='ios-arrow-back' android='md-arrow-back' style={styles.headerIconStyle} />
            </Button>
          </Left>

          <Body>
            <Title>Thêm sản phẩm</Title>
          </Body>

          <Right>
            <TouchableOpacity onPress={() => this.props.onCreateProduct()} style={{ flexDirection: 'row', alignContent: 'flex-end' }}>
              <Text style={styles.headerIconStyle}>Tạo</Text>
            </TouchableOpacity>
          </Right>
        </Header>

        {/* Content */}
        <Content padder>
          {this.props.productForm}
        </Content>
      </Container>
    ); 
  }
}

export default AddProduct;
