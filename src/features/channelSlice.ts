import { createSlice } from '@reduxjs/toolkit';
import { User } from './userSlice';

export interface Channel {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  text: string;
  user: User;
  timestamp: any;
}

interface ChannelState {
  channel: Channel | null;
}

const initialState: ChannelState = {
  channel: null,
}

export const channelSlice = createSlice({
  name: 'channel',
  initialState: initialState,
  reducers: {
    setChannel: (state, action) => {
      state.channel = action.payload;
    },
  },
});

export const { setChannel } = channelSlice.actions;

export const selectChannel = (state: any) => state.channel.channel as Channel;

export default channelSlice.reducer;
