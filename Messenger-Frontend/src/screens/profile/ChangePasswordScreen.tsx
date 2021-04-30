import * as React from 'react';
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
import { Formik, FormikProps } from 'formik';
import * as client from '../../api/client';
import { useAlert } from "react-alert";

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

    const formik = React.useRef<FormikProps<{ old_password: string; new_password: string }>>(
        null
    );

    const changePassword = async (new_password: string, old_password: string) => {
        const body = {
            userBid: 'USR00000001',
            password: old_password,
            newPassword: new_password
        }
            console.log(body);
        try{
            var res = await client.put.updatePassword(body, '1ae84552-780c-4868-9afe-3d1e676852bc');
            
            props.navigation.navigate('Profile');
        }catch(err){
            
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
                        onPress={() => props.navigation.navigate('Profile')}>
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
