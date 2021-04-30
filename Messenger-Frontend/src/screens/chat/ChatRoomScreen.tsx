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
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    let token: string;
    const [room, setRoom] = useState(1);

    // ---------------------------------------------------------------------------//

    // let roomId = ; // change to real room ID !!!

    // ---------------------------------------------------------------------------//
    

    const getMessages = async () => {
        var formatMessages:IMessage[] = [];
        var msgs = await client.get.getMessages(room, {offset:0}, token);
        
        msgs.data.data.items.forEach(function(item:any) {
            formatMessages.push({
                _id: item.id,
                text: item.content,
                createdAt: item.createdAt,
                user: {
                  _id: item.userId,
                  name: 'User',
                  avatar: 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png',
                },
            });
        });
        setMessages([...formatMessages]);
    } 

    const setToken = async () => {
        token = await AsyncStorage.getItem('accessToken') || '';
    }

    const init = async () => {
        await setRoomId();
        await setToken();
        await getMessages();
    }

    useEffect(() => {
        setMessages([...messages]);
    }, [])
    
    useEffect(() => {
        init();
    }, [messages, room])

    const setRoomId = async () => {
        const roomId = await AsyncStorage.getItem('roomId') || '';
        setRoom(Number(roomId));
    }

    const onSend = useCallback((messages = []) => {
        messages.forEach(function(item:any) {
            client.post.postMessage(room,{
                content:item.text,
                medium:false,
                medias:null
            },token);
        });
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, []);

    const deleteMessage = async (roomId:number, message:any) => {
        const token = await AsyncStorage.getItem('accessToken') || '';
        console.log(roomId);
        var response = await client.del.deleteMessage(roomId,message._id,token);
    }

    const onLongPress = (context:any, message:any) => {
        deleteMessage(room,message);
    }
    
   
    return (       
        
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            onLongPress={onLongPress}
            user={{
                _id: 1, // change to current user ID (for chat messages blue color)
            }}
        />

    );
};

export const ChatRoomScreen = connect(mapStateToProps, mapDispatchToProps)(ChatRoomScreenComponent);

const styles = StyleSheet.create({
});
