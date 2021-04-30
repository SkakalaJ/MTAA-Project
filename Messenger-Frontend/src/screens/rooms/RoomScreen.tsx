import React, { useState, useEffect } from 'react';
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
    const [rooms, setRooms] = useState<any[]>([]);

    const getRooms = async () => {
       
        var pulledRooms = await client.get.getRoomsAll('1ae84552-780c-4868-9afe-3d1e676852bc');
        setRooms([...pulledRooms.data.data.items]);
    } 

    useEffect(() => {
        getRooms();
    }, [rooms]);

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
                            <Icon name='person' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>App</Title>
                    </Body>
                    <Right>
                        <Button transparent
                        onPress={() => props.navigation.navigate('CreateRoom')}>
                            <Icon name='add-circle-outline' style={{ fontSize:30 }} />
                        </Button>
                    </Right>
                </Header>
             
                <Content>
                    <List>

                    {rooms.map((room) => (
                        <ListItem avatar key="{room.id}">
                            <Left style={styles.left}>
                                <Thumbnail source={{ uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png' }} />
                            </Left>
                            <Body style={styles.middle}>
                                <Text>{room.name}</Text>
                            </Body>
                          
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
