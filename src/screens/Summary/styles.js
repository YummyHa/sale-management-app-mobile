import { StyleSheet, Dimensions } from "react-native";

import Colors from '../../../constants/Colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA'
  },
  chooseButton: {
    width: width/2, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 0,
  },
  chooseTypeButton: {
    width: width/4, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 0,
  },
  buttonTintColor: {
    backgroundColor: Colors.tintColor
  },
  secondButtonColor: {
    backgroundColor: Colors.thirdTintColor
  },
  wrapperContent: {
    margin: 10,
    padding: 10,
    marginTop: 0,
    borderRadius: 5,
    borderWidth: 0.2,
    borderStyle: 'dashed'
  },
  orderSummaryDetailWrapper: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.2,
    borderStyle: 'dashed'
  }
});

export default styles;
