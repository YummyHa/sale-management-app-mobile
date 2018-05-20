import { StyleSheet } from "react-native";

import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  imageContainerStyle: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: 240,
    width: 240,
    borderRadius: 5
  },
  imageIconStyle: {
    height: 200,
    color: '#cdcaca',
    fontSize: 200,
    alignSelf: 'center'
  },
  inputContainerSytle: {
    borderBottomWidth: 0.3
  },
  labelStyle: {
    width: 120
  },
  inputTextStyle: {

  },
  formStyle: {
    paddingRight: 5,
  },
  barcodeIconStyle: {
    color: '#222'
  },
  category: {
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  categoryLabel: {
    marginLeft: 15,
  }
});

export default styles;
