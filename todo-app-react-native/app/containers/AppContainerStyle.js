import { StyleSheet } from 'react-native';
import * as colors from '../styles/colors';

const styles = StyleSheet.create({
  container: {
    padding: 1,
  },
  topBar: {
    flexDirection: 'row',
    padding: 20,
  },
  textInput: {
    flex: 1,
    height: 35,
    borderWidth: 1,
    borderColor: colors.BORDER_COLOR,
  },
  addButton: {
    flex: 1,
    height: 35,
    width: 40,
  },
  listButton: {
    flexDirection: 'row',
    height: 35,
  },
  scrollSection: {
    backgroundColor: 'transparent',
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default styles;
