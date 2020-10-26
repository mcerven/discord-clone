import React from 'react';
import './ChatHeader.css';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';

interface Props {
    channelName: string,
}

export default function ChatHeader({channelName}: Props) {
    return (
        <div className="chatHeader header">
            <div className="chatHeader__left">
                <h3 className="cursor-default"># {channelName}</h3>
            </div>
            <div className="chatHeader__right">
                <NotificationsIcon />
                <EditLocationIcon />
                <PeopleAltRoundedIcon />
            </div>
        </div>
    )
}
