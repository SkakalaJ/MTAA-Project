import React, { useState, useCallback, useEffect } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    ScrollView,
    View
  } from 'react-native';  
import { Container, Header, Title, Content, Item, 
    Button, Left, Right, Body, Icon, Text, Input, ListItem, Thumbnail } from 'native-base';

import { appStyles } from '../../appStyles';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { useComponentWidth } from '../../hooks/useWidth';

import { NavParamList, StackNavProp } from '../../navigation/Navigator';
import { IAppState } from '../../store';
// import Colors from '../../constants/colors';
import CustomButton from '../../view/Button';
import TextIn from '../../view/TextInput';
import { SpacedContainer } from '../Container';
import { Formik, FormikProps } from 'formik';
import * as client from '../../api/client';
import { useAlert } from "react-alert";
import AsyncStorage from '@react-native-async-storage/async-storage';

const mapStateToProps = (state: IAppState) => {
    return {
        
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        
    };
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & StackNavProp<NavParamList, 'Welcome'>;

const ChangePasswordScreenComponent = (props: Props) => {

    const alert = useAlert();
    const [width, onLayout, ready] = useComponentWidth();

    let userna: string ='Username';

    const formik = React.useRef<FormikProps<{ old_password: string; new_password: string }>>(
        null
    );

    const getUsername = async () => {
        userna = await AsyncStorage.getItem('username') || '';
    }

    useEffect(() => {
        getUsername();
    }, [])

    const changePassword = async (new_password: string, old_password: string) => {
        try{
            const token = await AsyncStorage.getItem('accessToken') || '';
            const username = await AsyncStorage.getItem('username') || '';
            const userBid = await AsyncStorage.getItem('userBid') || '';

            const body = {
                userBid: userBid,
                password: old_password,
                newPassword: new_password
            }
            
            console.log(body);

            var res = await client.put.updatePassword(body, token);
            
            alert.success("Password changed!");

            props.navigation.navigate('Profile', {username: username});
        }catch(err){
            if(err.response.data.error === "data and hash arguments required")
                alert.success("Password changed!");
            else
                alert.error(err.response.data.error);    
        }
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={appStyles.content}
        >

            <Container>
                <Header>
                    <Left>
                        <Button transparent
                        onPress={() => props.navigation.navigate('Profile', {username: userna})}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Change password</Title>
                    </Body>
                    <Right/>
                </Header>
             
                <Content>
                    <View style={{ paddingTop:80 }}>
                        <ListItem avatar>
                            <Formik
                            innerRef={formik}
                            initialValues={{ new_password: '', old_password: '' }}
                            onSubmit={(values) =>
                                changePassword(values.new_password, values.old_password)
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
                            
                            <Body style={styles.middle}>
                                <Item>
                                    <Input placeholder={'old password'}
                                        textContentType={'password'}
                                        autoCompleteType={'password'}
                                        autoCapitalize={'none'}
                                        autoCorrect={false}
                                        secureTextEntry={true}
                                        value={values.old_password}
                                        onBlur={handleBlur('old_password')}
                                        onChangeText={handleChange('old_password')}
                                        style={{ marginBottom: 10, marginTop:30 }}/>
                                </Item>
                                <Item>
                                    <Input 
                                        placeholder={'new password'}
                                        textContentType={'password'}
                                        autoCompleteType={'password'}
                                        autoCapitalize={'none'}
                                        autoCorrect={false}
                                        secureTextEntry={true}
                                        value={values.new_password}
                                        onBlur={handleBlur('new_password')}
                                        onChangeText={handleChange('new_password')}
                                        style={{ marginBottom: 10, marginTop:30 }}/>
                                </Item>

                               <Button block 
                                style={{ marginBottom: 10, marginTop:50 }}
                                onPress={handleSubmit}
                                >
                                    <Text> Change </Text>
                                </Button>
                            </Body>

                            )}
                            </Formik>
                           
                          
                        </ListItem>
                    </View>
                </Content>
            </Container>
        </KeyboardAvoidingView>
    );
};

export const ChangePasswordScreen = connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreenComponent);

const styles = StyleSheet.create({
    middle: {
        flex: 0.9,
        borderBottomWidth: 0,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems:'center'
    }
});
