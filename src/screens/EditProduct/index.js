import React from "react";
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, Icon, 
  ListItem, Thumbnail, Spinner } from 'native-base';
import { Platform } from 'react-native';
import LoadingSpinner from 'react-native-loading-spinner-overlay';
 
import styles from './styles';

class EditProduct extends React.PureComponent {
  render() {
    return (
      <Container style={styles.container}>
        <LoadingSpinner visible={this.props.isLoading} animation='fade' />
        {/* Header */}
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.onGoBack()}>
              <Icon active ios='ios-arrow-back' android='md-arrow-back' style={styles.headerIconStyle} />
              {Platform.OS === 'ios' ? <Text style={styles.headerBackText}>Lùi</Text> : <View />}
            </Button>
          </Left>

          <Body>
            <Title>Sửa sản phẩm</Title>
          </Body>

          <Right>
            <Button transparent onPress={() => this.props.onSaveProduct()}>
              <Text style={styles.headerBackText}>Lưu</Text>
            </Button>
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

export default EditProduct;
