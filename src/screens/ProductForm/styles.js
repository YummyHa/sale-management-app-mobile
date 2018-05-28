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
  inputContainerStyle: {
    borderBottomWidth: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    flexDirection: 'row',
    borderStyle: 'solid',
    borderColor: '#dadada',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  categoryLabel: {
    marginLeft: 15,
  },
  attributeStyles: {
    borderBottomWidth: 0,
    marginTop: 10,
    marginBottom: 10,
  },
  addAttrIcon: {
    color: Colors.tintColor
  },
  addAttrText: {
    color: Colors.tintColor,
    marginLeft: 5
  },
  divideView: {
    height: 15
  },
  borderContainer: {
    borderStyle: 'solid',
    borderColor: '#dadada',
    borderWidth: 0.5,
    borderRadius: 5
  }
});

export default styles;
