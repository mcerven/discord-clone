import React from 'react';
import './Login.css';
import { auth, authProvider } from '../../firebase';

export default function Login() {
    function signIn(): void {
        auth.signInWithPopup(authProvider)
            .catch(error => alert(error.message));
    }

    return (
        <div className="login">
            <img
                className="login__logo"
                src="https://i1.wp.com/blog.travian.com/wp-content/uploads/2020/05/discord.png"
                alt="Discord" />
            <button onClick={signIn}>
                <img
                    alt="Google"
                    src="https://img-authors.flaticon.com/google.jpg" />
                    Continue with&nbsp;<b>Google</b>
            </button>
        </div>
    )
}
