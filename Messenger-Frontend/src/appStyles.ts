import { StyleSheet } from 'react-native';
// import Colors from './constants/colors';

export const appStyles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#8F9AAA',
  },

  container: {
    flex: 1,
    backgroundColor: '#A8D5E2',
    padding: 24
  },

  content: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
  },

  shadow: {
    shadowColor: '#D8DFE7',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 8,

    elevation: 8,
  },

});
