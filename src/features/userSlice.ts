import { createSlice } from '@reduxjs/toolkit';

export interface User {
  uid: string;
  photo: string | null;
  email: string | null;
  displayName: string | null;
}

interface UserState {
  user: User | null;
}

const defaultState: UserState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: any) => state.user.user as User;

export default userSlice.reducer;
