import React, { useState } from 'react';
import './SidebarChannelOptions.css';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { db } from '../../../firebase';

interface Props {
    id: string;
}

export default function SidebarChannelOptions({id}: Props) {
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleDelete = async () => {
        await db.collection('channels').doc(id).delete();
        handleClose();
    }

    return (
        <div className="sidebarChannelOptions">
            <IconButton color="inherit"
                className="sidebarChannelOptions__button"
                onClick={handleOpen}>
                <MoreHorizIcon />
            </IconButton>

            <Menu
                id="channel-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem
                    onClick={handleDelete}>
                    Delete
                </MenuItem>
            </Menu>
        </div>
    )
}