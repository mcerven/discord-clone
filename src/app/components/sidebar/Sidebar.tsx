import React from 'react';
import './Sidebar.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SidebarChannels from './SidebarChannels';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__top header">
                <h3 className="cursor-default">Discord Server</h3>
                <ExpandMoreIcon />
            </div>
            <SidebarChannels />
        </div>
    )
}
