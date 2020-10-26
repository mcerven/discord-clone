import React, { useEffect, useState } from 'react';
import './SidebarChannels.css';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel';
import { db } from '../../../firebase';
import { Channel, selectChannel, setChannel } from '../../../features/channelSlice';
import SidebarProfile from './SidebarProfile';
import { IconButton, Tooltip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

export default function SidebarChannels() {
    const dispatch = useDispatch();
    const channelsCollection = db.collection('channels');
    const [channels, setChannels] = useState<Channel[]>([]);
    const selectedChannel = useSelector(selectChannel);

    useEffect(() => {
        channelsCollection.onSnapshot(snapshot => {
            const dbChannels = snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    name: doc.data().name,
                })
            );
            setChannels(dbChannels);
        });
    }, [channelsCollection]);

    const addChannel = () => {
        const name = prompt('Enter a new channel name.');
        if (!name) return;

        channelsCollection.add({
            name
        });
    }

    useEffect(() => {
        let selectedChannel = null;

        if (channels?.length > 0) {
            selectedChannel = channels[0];
        }
        dispatch(setChannel(selectedChannel));
    }, [channels]);

    return <div className="sidebarChannels">
        <div className="sidebarChannels__header">
            <div className="sidebarChannels__headerTop">
                <h4 className="cursor-default">Text Channels</h4>
            </div>
            <Tooltip title="Add channel">
                <IconButton color="inherit"
                    className="sidebarChannels_addChannel"
                    onClick={addChannel}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
            
        </div>
        <div className="sidebarChannels__list">
            { channels.map(({id, name}) => 
                <SidebarChannel
                    key={id}
                    id={id}
                    name={name}
                    isSelected={selectedChannel?.id === id} />
            )}
        </div>
        <SidebarProfile />
    </div>;
}
