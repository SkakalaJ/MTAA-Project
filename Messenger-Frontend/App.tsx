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
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

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

  const options = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER,
    // transition: transitions.SCALE
    containerStyle: { fontSize: '70%' },
  };

  useEffect(() => {

  }, []);

  return (
    <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
          <StatusBar backgroundColor={Colors.background} barStyle="dark-content"/>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </AlertProvider>
    </Provider>

  );
};

export default App;