import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';
import ChatHeader from './ChatHeader';
import { useSelector } from 'react-redux';
import { selectChannel, Message } from '../../../features/channelSlice';
import { db } from '../../../firebase';
import MessageComponent from './Message';
import NewMessage from './NewMessage';

export default function Chat() {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const channel = useSelector(selectChannel);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (!channel) {
            setMessages([]);
            return;
        }
        
        db.collection('channels')
            .doc(channel.id)
            .collection('messages')
            .orderBy('timestamp')
            .onSnapshot(snapshot => {
                const dbMessages = snapshot.docs.map((doc) => {
                    const { text, user, timestamp } = doc.data();
                    
                    return {
                        id: doc.id,
                        text,
                        user,
                        timestamp,
                    }
                });
                setMessages(dbMessages);
            });
    }, [channel]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView();
    }

    if (!channel) return (
        <div className="chat">    
        </div>
    );

    return (
        <div className="chat">
            <ChatHeader channelName={channel.name} />

            <div className="chat__messages">
                { messages.map((message) => (
                    <MessageComponent
                        key={message.id}
                        id={message.id}
                        text={message.text}
                        user={message.user}
                        timestamp={message.timestamp}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <NewMessage channel={channel} />
        </div>
    )
}
