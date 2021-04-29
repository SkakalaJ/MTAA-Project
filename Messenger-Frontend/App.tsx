import { StatusBar } from 'react-native';
import * as React from 'react';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './src/store';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
// Must be here -> see react navigation setup on the web
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation/Navigator';
import { IAppState } from './src/store';
import { Dispatch } from 'redux';
import { Provider } from 'react-redux';
import Colors from './src/constants/colors';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {
  createStackNavigator,
  StackNavigationProp
} from '@react-navigation/stack';


import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";


const mapStateToProps = (state: IAppState) => {
  return {
    test: null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  
  }
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const App = () => {
  const colorScheme = useColorScheme();

  useEffect(() => {

  }, []);

  return (
    <Provider store={store}>
        <StatusBar backgroundColor={Colors.background} barStyle="dark-content"/>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
    </Provider>

  );
};

export default App;