import * as React from 'react';
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
import axios from 'axios';
import { axiosClient } from '../../api';
// import { loginSchema } from '../../utils/validationSchemas';

const mapStateToProps = (state: IAppState) => {
    return {
        
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        
    };
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & StackNavProp<NavParamList, 'Registration'>;

const RegistrationScreenComponent = (props: Props) => {

    const formik = React.useRef<FormikProps<{ name: string, email: string; password: string }>>(
        null
    );
    
    const register = (name: string, email: string, password: string) => {
        axiosClient.post('/users/login')
        .then((response) => {console.log(response.data)})
        .catch((error) => {console.log(error)});
    };
    

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
                        initialValues={{ name: '', email: '', password: '' }}
                        onSubmit={(values) =>
                            register(values.name, values.email, values.password)
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
                                    keyboardType={'email-address'}
                                    autoCapitalize={'none'}
                                    value={values.email}
                                    // touched={touched.email}
                                    onBlur={handleBlur('email')}
                                    onChangeText={handleChange('email')}
                                    />
                            </Item>
                            <Item>
                                <Input 
                                    // error={errors.email && 'error username'}
                                    placeholder={'email'}
                                    textContentType={'emailAddress'}
                                    autoCompleteType={'email'}
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
                                    <Text> Register </Text>
                                </Button>
                        </View>
                        )}
                    </Formik>
                    <Button block light
                        style={{ marginBottom: 10, padding: 4 }}
                        onPress={() => props.navigation.navigate('Welcome')}>
                        <Text> Login </Text>
                    </Button>
                    </Content>
                </Container>
        </KeyboardAvoidingView>
    );
};

export const RegistrationScreen = connect(mapStateToProps, mapDispatchToProps)(RegistrationScreenComponent);

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center'
    },
});