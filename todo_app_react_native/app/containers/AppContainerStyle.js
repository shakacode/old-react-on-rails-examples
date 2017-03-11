import { StyleSheet } from 'react-native';
import * as colors from '../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 1,
  },
  topBar: {
    flex: 1,
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
  },
  todosList: {
    flex: 1,
  },
});

export default styles;
