import React, { useState } from 'react';
import firebase from 'firebase';
import { db } from '../../../firebase';
import { useSelector } from 'react-redux';
import { Channel } from '../../../features/channelSlice';
import { selectUser } from '../../../features/userSlice';
import { Send } from '@material-ui/icons';
import { IconButton, Tooltip } from '@material-ui/core';
import './NewMessage.css';

interface Props {
    channel: Channel;
}
export default function NewMessage({channel}: Props) {
    const user = useSelector(selectUser);
    const [text, setText] = useState('');
    
    function isSendMessageDisabled(): boolean {
        return !channel.id || !text;
    }

    function handleTextChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setText(e.target.value);
    };

    function sendMessage(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (isSendMessageDisabled())
            return;

        const newMessage = {
            text,
            user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        };

        db.collection('channels')
            .doc(channel.id)
            .collection('messages')
            .add(newMessage);

        setText('');
    };
    
    return (
        <form className="newMessage" onSubmit={sendMessage}>
            <div className="newMessage__inputLayout">
                <input
                    name="input"
                    placeholder={`Message ${channel.name}`}
                    disabled={!channel.id}
                    value={text}
                    onChange={handleTextChange} />
                <Tooltip title="Send">
                    <IconButton type="submit">
                        <Send />
                    </IconButton>
                </Tooltip>
            </div>
        </form>
    );
}
