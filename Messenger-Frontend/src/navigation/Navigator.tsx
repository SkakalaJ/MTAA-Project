import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { WelcomeScreen } from '../screens/welcome/WelcomeScreen';
import { RegistrationScreen } from '../screens/registration/RegistrationScreen';
  
const Stack = createStackNavigator<NavParamList>();
const Tab = createBottomTabNavigator<NavParamList>();

export interface StackNavProp<NavParamList extends ParamListBase, RouteName extends keyof NavParamList = string> {
    navigation: StackNavigationProp<NavParamList, RouteName>;
    route: RouteProp<NavParamList, RouteName>;
}

export interface BottomNavProp<NavParamList extends ParamListBase, RouteName extends keyof NavParamList = string> {
    navigation: BottomTabNavigationProp<NavParamList, RouteName>;
    route: RouteProp<NavParamList, RouteName>;
}

export type NavParamList = {
    // Root
    Splash: undefined;
    // Onboard: undefined
    LoginNavigator: undefined;
    // MainMenuNavigator: { screen: string } | undefined;

    // Login
    Welcome: undefined;
    Login: undefined;
    Registration: undefined;
    RegistrationAccount: undefined;
    RegistrationFinish: {
        token?: string;
        email?: string;
        password?: string;
        firstName?: string;
        lastName?: string;
    };
};

export function RootNavigator() {
    return (
        <Stack.Navigator initialRouteName="Splash" headerMode="none">
            <Stack.Screen name="LoginNavigator" component={LoginNavigator} />
        </Stack.Navigator>
    );
}

export function LoginNavigator() {
    return (
        <Stack.Navigator initialRouteName="Welcome" headerMode="none">
            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
            <Stack.Screen name="Registration" component={RegistrationScreen}/>
        </Stack.Navigator>
    );
}
  