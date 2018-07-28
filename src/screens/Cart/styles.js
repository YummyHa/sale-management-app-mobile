import { StyleSheet, Platform } from "react-native";

import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  headerIconStyle: {
    color: Platform.OS === 'ios' ? Colors.tintColor : '#fff'
  },
  headerBackText: {
    color: Platform.OS === 'ios' ? Colors.tintColor : '#fff'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFAFA'
  },
  customer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  icon: {
    color: Colors.tintColor
  },
  customerName: {
    fontSize: 14,
    marginTop: 7
  },
  total: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 15, 
    backgroundColor: Colors.secondTintColor 
  },
  listItem: {
    paddingTop: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 0.2,
    borderBottomColor: Colors.textColor
  },
  modalContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStyle: {
    width: 160
  }
});

export default styles;
