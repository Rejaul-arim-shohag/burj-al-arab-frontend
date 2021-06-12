import React, { useContext } from 'react';
import firebase from "firebase/app";
import { useHistory, useLocation } from 'react-router-dom';
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const {displayName, email} = result.user;
                const signedInUser = {name : displayName, email};
                setLoggedInUser(signedInUser);
                history.replace(from)
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
    );
};

export default Login;