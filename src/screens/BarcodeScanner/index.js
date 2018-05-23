import React from 'react';
import { Header, Left, Right, Body, View, Container, Button, Icon, Title, Text,
  Content } from 'native-base';
import { BarCodeScanner, Permissions } from 'expo';
import { StatusBar } from 'react-native';

import styles from './styles';

class BarCodeScannerScreen extends React.Component {
  state = {
    isPermissionsGranted: false,
    torchMode: 'off',
    type: 'back'
  }

  async componentDidMount() {
    let { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ isPermissionsGranted: (status === 'granted') })
  }

  render() {
    if (!this.state.isPermissionsGranted) {
      return (
        <Container>
          <StatusBar translucent={false} />
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon ios='ios-arrow-back' android='md-arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Scan BarCode</Title>
            </Body>
            <Right />
          </Header>

          <View style={styles.container}>
            <Text>You have not granted permission to use the camera on this device!</Text>
          </View>
        </Container>
      );
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()} >
              <Icon ios='ios-arrow-back' android='md-arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Scanning</Title>
          </Body>
          <Right />
        </Header>

        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeRead={this.props._handleBarCodeRead}
            torchMode={this.state.torchMode}
            type={this.state.type}
            style={styles.preview}
          />

          <View style={styles.toolbar}>
            <Button block onPress={this._toggleTorch} >
              <Text>Toggle Flashlight</Text>
            </Button>
            <Button block onPress={this._toggleType} >
              <Text>Toggle Direction</Text>
            </Button>
          </View>
        </View>
      </Container>

    );
  }

  _toggleTorch = () => {
    this.setState({ torchMode: this.state.torchMode === 'off' ? 'on' : 'off' });
  };

  _toggleType = () => {
    this.setState({ type: this.state.type === 'back' ? 'front' : 'back' });
  };
}

export default BarCodeScannerScreen;
