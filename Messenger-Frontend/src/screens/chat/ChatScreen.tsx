import React,{ useState, useCallback, useEffect } from 'react';
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
import * as client from '../../api/client';
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

const ChatScreenComponent = (props: Props) => {

    const [width, onLayout, ready] = useComponentWidth();
    const [users, setUsers] = useState<any[]>([]);

    let userna: string = 'Username';

    const getUsers = async () => {
        const token = await AsyncStorage.getItem('accessToken') || '';
        userna = await AsyncStorage.getItem('username') || '';

        var pulledUsers = await client.get.getUsersAll(token);
        console.log(pulledUsers.data.data.items);
        setUsers([...pulledUsers.data.data.items]);
    }
    const allUsers = async () => {
        // var users = await client.get.getUsersAll('1ae84552-780c-4868-9afe-3d1e676852bc');
        // console.log(users.data);
    } 

    const clicked = (userId: any) => {
        // props.navigation.navigate('ChatRoom', {roomId: 0});
    }

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        
    }, [users]);

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
                            <Icon name='person' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>App</Title>
                    </Body>
                    <Right />
                </Header>
              
                <KeyboardAvoidingView>
                    <ScrollView
                    horizontal={true}
                    style={styles.bottomBorder}
                    >
                        {users.map((user) => (
                            <KeyboardAvoidingView style={styles.horizontalIcon} key={user.id}>
                                <Thumbnail source={{ uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png' }} />
                                <Text note>{user.username}</Text>
                            </KeyboardAvoidingView> 
                        ))}
                        
                    </ScrollView>
                </KeyboardAvoidingView>
                <Content>
                    <List>
                    
                    {users.map((user) => (
                        <ListItem avatar key={user.id} onPress={() => clicked(user.id)}>
                            <Left style={styles.left}>
                                <Thumbnail source={{ uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png' }} />
                            </Left>
                            <Body style={styles.middle}>
                                <Text>{user.username}</Text>
                                <Text note></Text>
                            </Body>
                            <Right style={styles.right}>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>
                    ))}

                    </List>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical
                        onPress={() => props.navigation.navigate('Chat')}>
                            <Icon name="chatbubble" />
                            <Text>Chat</Text>
                        </Button>
                        <Button vertical
                        onPress={() => props.navigation.navigate('Rooms')}>
                            <Icon name="chatbubbles" />
                            <Text>Rooms</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        </KeyboardAvoidingView>
    );
};

export const ChatScreen = connect(mapStateToProps, mapDispatchToProps)(ChatScreenComponent);

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
        // border:'none'
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
