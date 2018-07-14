import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
  },
  titleTextStyle: {
    width: 130
  },
  valueTextStyle: {
    color: Colors.textColor
  },
  imageStyle: {
    backgroundColor: '#fff',
    height: 240,
    width: 240,
    borderRadius: 5
  },
  viewImageStyle: {
    backgroundColor: '#fff',
    height: 240,
    width: 240,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
