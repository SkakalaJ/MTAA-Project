import * as React from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View
  } from 'react-native';  
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
        axios({
            headers: {"Access-Control-Allow-Origin": "*"},
            method: 'post',
            url: 'http://localhost:4000/api/users/login'
        }).then(() => {console.log("then")}).catch((err) => {console.log(err)});
    };
    

    const [width, onLayout, ready] = useComponentWidth();
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={appStyles.content}
        >

            <SpacedContainer onLayout={onLayout} ready={ready} disableHeader>
                <View style={styles.content}>
                    <Formik
                        innerRef={formik}
                        // validationSchema={loginSchema}
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
                            <TextIn
                                width={width}
                                style={{ marginBottom: 24, backgroundColor: Colors.white }}
                                error={errors.email && 'error username'}
                                placeholder={'username'}
                                // textContentType={'emailAddress'}
                                // autoCompleteType={'email'}
                                keyboardType={'email-address'}
                                autoCapitalize={'none'}
                                value={values.name}
                                touched={touched.name}
                                onBlur={handleBlur('email')}
                                onChangeText={handleChange('email')}
                            />
                            <TextIn
                                width={width}
                                style={{ marginBottom: 24, backgroundColor: Colors.white }}
                                error={errors.email && 'error email'}
                                placeholder={'email'}
                                textContentType={'emailAddress'}
                                autoCompleteType={'email'}
                                keyboardType={'email-address'}
                                autoCapitalize={'none'}
                                value={values.email}
                                touched={touched.email}
                                onBlur={handleBlur('email')}
                                onChangeText={handleChange('email')}
                            />
                            <TextIn
                                width={width}
                                style={{ marginBottom: 24, backgroundColor: Colors.white }}
                                placeholder={'password'}
                                error={errors.password && 'password error'}
                                textContentType={'password'}
                                autoCompleteType={'password'}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                secureTextEntry={true}
                                value={values.password}
                                touched={touched.password}
                                onBlur={handleBlur('password')}
                                onChangeText={handleChange('password')}
                            />
                            <CustomButton
                                width={width}
                                style={{ marginBottom: 0, backgroundColor: Colors.blue }}
                                title={"Register"}
                                onPress={handleSubmit}
                            />
                        </View>
                        )}
                    </Formik>
                </View>
            </SpacedContainer>
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
