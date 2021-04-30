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
// import Colors from '../../constants/colors';
import CustomButton from '../../view/Button';
import TextIn from '../../view/TextInput';
import { SpacedContainer } from '../Container';
import { Formik, FormikProps } from 'formik';


const mapStateToProps = (state: IAppState) => {
    return {
        
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        
    };
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & StackNavProp<NavParamList, 'Welcome'>;

const CreateRoomScreenComponent = (props: Props) => {
    
    const [width, onLayout, ready] = useComponentWidth();
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={appStyles.content}
        >

            <Container>
                <Header>
                    <Left>
                        <Button transparent
                        onPress={() => props.navigation.navigate('Rooms')}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Create new room</Title>
                    </Body>
                    <Right/>
                </Header>
             
                <Content>
                    <View style={{ paddingTop:100 }}>
                        <ListItem avatar>
                            <Body style={styles.middle}>
                            
                               <Text style={{ paddingBottom:10 }}>
                                    Upload photo
                               </Text>
                               <Thumbnail source={{ uri: 'https://icons-for-free.com/iconfiles/png/512/file+up+upload+icon-1320086060265757591.png' }} />
                               
                               <Item>
                                    <Input placeholder={'room name'}
                                        style={{ marginBottom: 10, marginTop:30 }}/>
                               </Item>
                               <Button block 
                                style={{ marginBottom: 10, marginTop:30 }}
                                >
                                    <Text> Save </Text>
                                </Button>
                            </Body>
                          
                        </ListItem>
                    </View>
                </Content>
            </Container>
        </KeyboardAvoidingView>
    );
};

export const CreateRoomScreen = connect(mapStateToProps, mapDispatchToProps)(CreateRoomScreenComponent);

const styles = StyleSheet.create({
    middle: {
        flex: 0.9,
        borderBottomWidth: 0,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems:'center'
    }
});