import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import initializeAuth from '../Firebase/firebase.initialize';
initializeAuth();



const EmailPassLogin = () => {
    ///////////////////

    const [email, setEmail] = useState("")
    const handleEmailChange = e => {
        setEmail(e.target.value);
    }

    //////////////

    const [password, setPassword] = useState("")
    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }

    ///////////////////
    const [error, setError] = useState("")
    const auth = getAuth();

    const handleRegistrations = e => {
        e.preventDefault()
        console.log(email, password)
        if (password.length < 6) {
            setError("Password must be at least 6 characters long")
            return;
        }

        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError("Password must contain 2 uppercase letters")
        }

        isLogin ? processLogin(email, password) : CreateNewUser(email, password)


    }

    /////////////////////////////////Login By Email Password////////////////////////////////////////////////////

    const processLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user
                console.log(user)
                setError("")
            })
            .catch(err => {
                setError(err.message)
            })
    }

    //////////////////////////Create New User/////////////////////////////////////////
    const CreateNewUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                console.log(user)
                setError('')
                verifyEmail();
                setUserName();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
            });
    }


    //////////////

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(res => {
                console.log(res)
            })

    }

    ///////////////Check Login Or Not//////////////////////

    const [isLogin, setisLogin] = useState(false)

    const toggleLogin = e => {
        setisLogin(e.target.checked)
    }
    //////////////////////////
    const handleResetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(res => {
                console.log(res)
                setError('Check Your Email')
            })
            .catch(err => {
                setError(err.message)
            })
    }
    ////// Update Name //////////
    const [name, setName] = useState('')
    console.log("display", name)
    const handleNameChange = e => {
        console.log(e.target.value)
        setName(e.target.value)

    }


    const setUserName = () => {
        updateProfile(auth.currentUser, { displayName: name })
            .then(() => {
                setError('')
            }).catch((error) => {
                setError(error.message)
            });
    }

    return (
        <div className="container col-sm-6">
            <form onSubmit={handleRegistrations}>
                <h3>Please {isLogin ? "Login" : "Register"}</h3>

                {
                    !isLogin &&
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">User Name</label>
                        <input onBlur={handleNameChange} type="text" claclassNamess="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                }

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onBlur={handleEmailChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" onBlur={handlePasswordChange} className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input onChange={toggleLogin} className="form-control" id="example" type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Already Have an Account? </label>
                </div>

                <div className="text-danger my-2">{error}</div>

                <button type="submit" className="btn btn-primary btn-sm">{isLogin ? "Login" : "Register"}</button>
                <button onClick={handleResetPassword} type="button" className="btn btn-primary btn-sm mx-2">Reset Password</button>

            </form>
        </div>
    );
};

export default EmailPassLogin;
