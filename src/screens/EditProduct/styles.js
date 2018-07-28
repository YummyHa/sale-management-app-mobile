import { StyleSheet, Platform } from "react-native";

import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA'
  },
  headerIconStyle: {
    color: Platform.OS === 'ios' ? Colors.tintColor : '#fff'
  },
  headerBackText: {
    color: Platform.OS === 'ios' ? Colors.tintColor : '#fff'
  }
});

export default styles;
