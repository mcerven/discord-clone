import { Avatar, IconButton, Tooltip } from '@material-ui/core';
import { Headset, Mic, Settings } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import { auth } from '../../../firebase';
import './SidebarProfile.css';

export default function SidebarProfile() {
    const user = useSelector(selectUser);

    const signOut = () => {
        auth.signOut();
    }

    return (
        <div className="sidebarProfile">
            <Tooltip title="Logout">
                <IconButton size="small"
                    className="sidebarProfile__logout"
                    onClick={signOut}>
                    <Avatar src={user.photo || undefined} />
                </IconButton>
            </Tooltip>
            <h3 className="sidebarProfile__name">{user.displayName}</h3>
            <Mic fontSize="inherit" />
            <Headset fontSize="inherit" />
            <Settings fontSize="inherit" />
        </div>
    )
}
