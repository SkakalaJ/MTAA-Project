import React, { useState, useCallback, useEffect } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    View
  } from 'react-native';  
import { Container, Header, Title, Content, Item, 
    Button, Left, Right, Body, Icon} from 'native-base';
import { GiftedChat, SystemMessage, IMessage,  } from 'react-native-gifted-chat'

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

const ChatRoomScreenComponent = (props: Props) => {
    
    const [width, onLayout, ready] = useComponentWidth();
    const [messages, setMessages] = useState<IMessage[]>([]);

    var message:IMessage = {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
    }

    useEffect(() => {
        setMessages([...messages, message]);
    }, [])
    
    useEffect(() => {
        console.log(messages);
    }, [messages])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (       
        /* <Header>
            <Left>
                <Button transparent>
                    <Icon name='arrow-back' />
                </Button>
            </Left>
            <Body>
                <Title>Username</Title>
            </Body>
            <Right/>
        </Header> */
    
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1, // change to logged user ID 
            }}
            />

    );
};

export const ChatRoomScreen = connect(mapStateToProps, mapDispatchToProps)(ChatRoomScreenComponent);

const styles = StyleSheet.create({
});
