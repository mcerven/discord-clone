import { Avatar, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { Message as IMessage, selectChannel } from '../../../features/channelSlice';
import { selectUser } from '../../../features/userSlice';
import { db } from '../../../firebase';
import './Message.css';

export default function Message({id, text, user, timestamp}: IMessage) {
    const selectedChannel = useSelector(selectChannel);
    const currentUser = useSelector(selectUser);
    
    function dateToString(): string | null {
        if (!timestamp) return null;

        return timestamp.toDate().toLocaleString();
    }

    const handleDelete = async () => {
        await db.collection('channels')
            .doc(selectedChannel.id)
            .collection('messages')
            .doc(id)
            .delete();
    }

    return (
        <div className="message">
            <Avatar src={user.photo || undefined} />
            <div className="message__content">
                <div>
                    <span className="message__user">{user.displayName}</span>
                    <span className="message__timestamp">
                        {dateToString()}
                    </span>
                    { currentUser.uid === user.uid &&
                        <IconButton
                            color="inherit"
                            size="small">
                            <Delete onClick={handleDelete} />
                        </IconButton>
                    }
                </div>
                <p>{text}</p>
            </div>
        </div>
    )
}
