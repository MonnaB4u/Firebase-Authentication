import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import initializeAuth from '../Firebase/firebase.initialize';
import GithubLogin from './GithubLogin';
import EmailPassLogin from './EmailPassLogin';



const provider = new GoogleAuthProvider();
initializeAuth();

const Login = () => {

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
            <div className=" m-5 ">

                <EmailPassLogin></EmailPassLogin>

            </div>
            <div className="col-sm text-center">
                {
                    !logUser.name ?
                        <button className="btn bg-success mb-2 text-white w-25" onClick={() => handleLogin()}>Google</button>
                        :
                        <button className="btn bg-danger w-25" onClick={() => handleSignOut()}>Google Sign Out</button>
                }

                <GithubLogin></GithubLogin>
                <br />
                {
                    logUser.email &&
                    <div>
                        <h1>WellCome {logUser.name}</h1>
                        <p>Your Email is:-- <a href="">{logUser.email}</a></p>
                    </div>
                }
            </div>

        </div>
    );
};

export default Login;
