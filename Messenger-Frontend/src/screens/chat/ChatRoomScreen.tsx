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
 
    // ---------------------------------------------------------------------------//

    const roomId = 1; // change to real room ID !!!
    const session = '1ae84552-780c-4868-9afe-3d1e676852bc'; // change to real session

    // ---------------------------------------------------------------------------//
    

    const getMessages = async () => {
        var formatMessages:IMessage[] = [];
        var msgs = await client.get.getMessages(roomId, {offset:0}, session);
        
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

    useEffect(() => {
        setMessages([...messages]);
    }, [])
    
    useEffect(() => {
        getMessages();
    }, [messages])

    const onSend = useCallback((messages = []) => {
        messages.forEach(function(item:any) {
            client.post.postMessage(roomId,{
                content:item.text,
                medium:false,
                medias:null
            },session);
        });
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, []);

    const deleteMessage = async (roomId:number, message:any) => {
        var response = await client.del.deleteMessage(roomId,message._id,session);
    }

    const onLongPress = (context:any, message:any) => {
        deleteMessage(roomId,message);
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
