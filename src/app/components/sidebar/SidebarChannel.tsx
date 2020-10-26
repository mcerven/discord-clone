import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Channel, setChannel, selectChannel } from '../../../features/channelSlice';
import './SidebarChannel.css';
import SidebarChannelOptions from './SidebarChannelOptions';

interface Props {
    id: string;
    name: string;
    isSelected: boolean;
}

export default function SidebarChannel({id, name, isSelected}: Props) {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const dispatch = useDispatch();
    const selectedChannel = useSelector(selectChannel);
    const onSelectChannel = () => {
        const newChannel: Channel = {
            id,
            name,
        };

        dispatch(setChannel(newChannel));
    };

    return (
        <div 
            className={`sidebarChannel
                ${isSelected ? 'selected' : ''}
                ${selectedChannel?.id === id ? 'selected' : ''}
                ${isMouseOver ? 'isHovering' : ''}`
            }
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
            onClick={onSelectChannel}>
            <h4>
                <span className="sidebarChannel__hash"># </span>{name}
            </h4>
            <SidebarChannelOptions id={id} />
        </div>
    )
}
