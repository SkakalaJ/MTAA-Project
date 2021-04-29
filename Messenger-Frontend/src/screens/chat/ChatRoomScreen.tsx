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

import { appStyles } from '../../appStyles';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { useComponentWidth } from '../../hooks/useWidth';

import { NavParamList, StackNavProp } from '../../navigation/Navigator';
import { IAppState } from '../../store';
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

const ChatRoomScreenComponent = (props: Props) => {
    
    const [width, onLayout, ready] = useComponentWidth();
    const [messages, setMessages] = useState([]);

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
        setMessages([
            message
        ])
      }, [])
    
      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={appStyles.content}
        >

            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Username</Title>
                    </Body>
                    <Right/>
                </Header>
             
                <Content>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                    />
                </Content>
            </Container>
        </KeyboardAvoidingView>
    );
};

export const ChatRoomScreen = connect(mapStateToProps, mapDispatchToProps)(ChatRoomScreenComponent);

const styles = StyleSheet.create({
});
