import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Chat from "./app/components/chat/Chat";
import Login from './app/components/Login';
import Sidebar from './app/components/sidebar/Sidebar';
import { login, logout, selectUser, User } from './features/userSlice';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in
        const newUser: User = {
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }

        dispatch(login(newUser));
      } else {
        // user is logged out
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {user
        ? (
          <>
            <Sidebar />
            <Chat />
          </>
        ) 
        : (
          <Login />
        )
      }
    </div>
  );
}

export default App;
