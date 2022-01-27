import React, { useState } from 'react';
import { getAuth, signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import initializeAuth from '../Firebase/firebase.initialize';
const provider = new GithubAuthProvider();

initializeAuth();

const GithubLogin = () => {
    const [logUser, setlogUser] = useState({})

    const handleLogin = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then(result => {
                const { displayName, email, photoURL } = result.user;
                let user = {
                    name: displayName,
                    email: email,
                    photoURL: photoURL
                }
                setlogUser(user);
                console.log(user)
            })
            .catch(err => {
                alert(err.message)
            })
    }

    const auth = getAuth();
    const handleSignOut = () => {

        signOut(auth)
            .then(() => {
                setlogUser({});
            })
    }

    return (
        <div>
            {
                !logUser.name ?
                    <button className="btn bg-dark text-white w-25" onClick={() => handleLogin()}>Github</button>
                    :
                    <button className="btn bg-danger text-white w-25" onClick={() => handleSignOut()}>Github Sign Out</button>

            }

            {
                logUser.name &&
                <div>
                    <h1>WellCome {logUser.name}</h1>
                    <p>Your Github Email is:-- <a href="">{logUser.email}</a></p>
                </div>
            }
        </div>
    );
};

export default GithubLogin;
