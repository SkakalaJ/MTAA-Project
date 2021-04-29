import * as React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    ScrollView,
  } from 'react-native';  
import { Container, Header, Title, Content, Footer, FooterTab, 
    Button, Left, Right, Body, Icon, Text, List, ListItem, Thumbnail } from 'native-base';

import { appStyles } from '../../appStyles';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { useComponentWidth } from '../../hooks/useWidth';

import { NavParamList, StackNavProp } from '../../navigation/Navigator';
import { IAppState } from '../../store';
import Colors from '../../constants/colors';
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

const RoomScreenComponent = (props: Props) => {
    
    const [width, onLayout, ready] = useComponentWidth();
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={appStyles.content}
        >

            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='person' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>App</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='add-circle-outline' style={{ fontSize:30 }} />
                        </Button>
                    </Right>
                </Header>
             
                <Content>
                    <List>
                        <ListItem avatar>
                            <Left style={styles.left}>
                                <Thumbnail source={{ uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png' }} />
                            </Left>
                            <Body style={styles.middle}>
                                <Text>Room 1</Text>
                            </Body>
                          
                        </ListItem>
                        <ListItem avatar>
                            <Left style={styles.left}>
                                <Thumbnail source={{ uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png' }} />
                            </Left>
                            <Body style={styles.middle}>
                                <Text>Room 2</Text>
                            </Body>
                           
                        </ListItem>
                    </List>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical>
                            <Icon name="chatbubble" />
                            <Text>Chat</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="chatbubbles" />
                            <Text>Rooms</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        </KeyboardAvoidingView>
    );
};

export const RoomScreen = connect(mapStateToProps, mapDispatchToProps)(RoomScreenComponent);

const styles = StyleSheet.create({
    left: {
        flex: 0.15,
    },
    middle: {
        flex: 0.65,
    },
    right: {
        flex: 0.2,
        paddingBottom:0
    },
    horizontalIcon: {
        margin: 7,
        textAlign: 'center'
    },
    bottomBorder: {
        borderBottomColor: 'black',
        borderBottomWidth: 1
    }
});