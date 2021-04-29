import React, { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View
  } from 'react-native';  
import { Container, Content, Item, Input, Button } from 'native-base';

import { appStyles } from '../../appStyles';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { useComponentWidth } from '../../hooks/useWidth';
import { translate } from '../../i18n/Language';
import { NavParamList, StackNavProp } from '../../navigation/Navigator';
import { IAppState } from '../../store';
// import { SessionActions } from '../../store/session/actions';
import Colors from '../../constants/colors';
import CustomButton from '../../view/Button';
import TextIn from '../../view/TextInput';
import { SpacedContainer } from '../Container';
import { Formik, FormikProps } from 'formik';

import IdleTimer from 'react-idle-timer';
import * as client from '../../api/client';
import { useAlert } from "react-alert";
import { useIdleTimer } from 'react-idle-timer';
import {useRoute} from '@react-navigation/native';
import * as minio from '../../api/minio';

// import { loginSchema } from '../../utils/validationSchemas';

const mapStateToProps = (state: IAppState) => {
    return {
        
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        
    };
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & StackNavProp<NavParamList, 'Welcome'>;

let intervalId: NodeJS.Timeout;


const WelcomeScreenComponent = (props: Props) => {
    const alert = useAlert();


    const formik = React.useRef<FormikProps<{ email: string; password: string }>>(
        null
    );
    
    
    const handleOnAction = () => {
        // minio.uploadFile();
        // getToken();
    }
    
    const handleOnActive = () => {
        clearInterval(intervalId);
    }

    const handleOnIdle = () => {
        const {index, routes} = props.navigation.dangerouslyGetState();
        const currentScreen = routes[index].name;

        if( currentScreen != "Welcome" && currentScreen != "Registration" ){
            intervalId = setInterval(checkSession, 10000);
        }
    }

    const checkSession = async () => {
        try{
            const token = await AsyncStorage.getItem('accessToken') || '';
            await client.get.getUserById(9999999, token);

            const {index, routes} = props.navigation.dangerouslyGetState();
            const currentScreen = routes[index].name;

            if( currentScreen == "Welcome" || currentScreen == "Registration" ){
                props.navigation.navigate('Chat');
            }

        }catch(err){
            props.navigation.navigate('Welcome');
            alert.error("Session expired! Logout...");
        }
    }

    const getToken = async () => {
        const token = await AsyncStorage.getItem('accessToken') || '';
        checkSession();
    }

    useEffect(() => {
        getToken();
    }, []);

    const loginWithPassword = async (username: string, password: string) => {
        const loginBody = {
            username: username,
            password: password,
            geolocation: false,
            device: {
                type: "mobile phone"
            }
        }

        try{
            var res = await client.post.postLogin(loginBody);
            AsyncStorage.setItem('accessToken', res.data.data.accessToken);
            AsyncStorage.setItem('userBid', res.data.data.accessToken);
            AsyncStorage.setItem('username', res.data.data.accessToken);
            props.navigation.navigate('Chat');

            // console.log(res.data.data.accessToken);
        }catch(err){
            if( err.response.status == 307 && err.response.data.error == null ){
                AsyncStorage.setItem('accessToken', err.response.data.data.accessToken);
                AsyncStorage.setItem('userBid', err.response.data.data.userBid);
                AsyncStorage.setItem('username', err.response.data.data.username);
                props.navigation.navigate('Chat');
            }
            else
                alert.error(err.response.data.error);    
        }
    };
    
    const { getRemainingTime, getLastActiveTime, reset } = useIdleTimer({
        timeout: 2000,
        onIdle: handleOnIdle,
        onActive: handleOnActive,
        onAction: handleOnAction,
        debounce: 100
    })

    const [width, onLayout, ready] = useComponentWidth();
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={appStyles.content}
        >

            <Container>
                <Content style={{ paddingTop: 100 }}>
                    <Formik
                        innerRef={formik}
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) =>
                            loginWithPassword(values.email, values.password)
                        }
                        >
                            {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        }) => (
                        <View>

                            <Item>
                                <Input 
                                    // error={errors.email && 'error username'}
                                    placeholder={'username'}
                                    // textContentType={'emailAddress'}
                                    // autoCompleteType={'email'}
                                    keyboardType={'email-address'}
                                    autoCapitalize={'none'}
                                    value={values.email}
                                    // touched={touched.email}
                                    onBlur={handleBlur('email')}
                                    onChangeText={handleChange('email')}
                                    />
                            </Item>
                            <Item last>
                                <Input placeholder={'password'}
                                    // error={errors.password && 'password error'}
                                    textContentType={'password'}
                                    autoCompleteType={'password'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    value={values.password}
                                    // touched={touched.password}
                                    onBlur={handleBlur('password')}
                                    onChangeText={handleChange('password')}
                                    />
                            </Item>
                            <Button block 
                                style={{ marginBottom: 10, marginTop:30 }}
                                onPress={handleSubmit}
                                >
                                    <Text> Login </Text>
                                </Button>
                        </View>
                        )}
                    </Formik>
                    <Button block light
                        style={{ marginBottom: 10, padding: 4 }}
                        onPress={() => props.navigation.navigate('Registration')}>
                        <Text> Register </Text>
                    </Button>
                    
                    <View>
                        <Text>
                            Ukazky screenov:
                        </Text>
                        <Button rounded warning
                        onPress={() => props.navigation.navigate('Chat')}>
                            <Text>Home</Text>
                        </Button>
                        <Button rounded warning
                        onPress={() => props.navigation.navigate('Rooms')}>
                            <Text>Rooms</Text>
                        </Button>
                        <Button rounded warning
                        onPress={() => props.navigation.navigate('CreateRoom')}>
                            <Text>Create Room</Text>
                        </Button>
                        <Button rounded warning
                        onPress={() => props.navigation.navigate('Profile')}>
                            <Text>Profile</Text>
                        </Button>
                        <Button rounded warning
                        onPress={() => props.navigation.navigate('ChangePassword')}>
                            <Text>Change password</Text>
                        </Button>
                        <Button rounded warning
                        onPress={() => props.navigation.navigate('ChatRoom')}>
                            <Text>Chat room</Text>
                        </Button>
                    </View>
                    
                    
                </Content>
            </Container>

        </KeyboardAvoidingView>
    );
};

export const WelcomeScreen = connect(mapStateToProps, mapDispatchToProps)(WelcomeScreenComponent);

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center'
    },
});
