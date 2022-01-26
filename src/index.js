import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App";
import * as serviceWorker from "./serviceWorker";
import {Provider as ReduxProvider} from "react-redux";
import configureStore from "./Redux/Store";
import firebase from "firebase/compat";
import "firebase/auth";
import "firebase/firestore";
import {getFirestore} from "firebase/firestore";
// import 'firebase/functions' // <- needed if using httpsCallable
import {ReactReduxFirebaseProvider} from "react-redux-firebase";
import {createFirestoreInstance} from "redux-firestore"; // <- needed if using firestore


const firebaseConfig = {
    apiKey: "AIzaSyBGXO6p4zmqqlCNuUbPgngsX-ml9XBAMAQ",
    authDomain: "projectmumbai-ae984.firebaseapp.com",
    projectId: "projectmumbai-ae984",
    storageBucket: "projectmumbai-ae984.appspot.com",
    messagingSenderId: "1002649692190",
    appId: "1:1002649692190:web:affa59251e270f91b7260f",
    measurementId: "G-3V4HFF1FEV"
};

// react-redux-firebase config
const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
};

// Initialize firebase instance
const app = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// Initialize other services on firebase instance
const firestoreDb = firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

const store = configureStore();

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance, // <- needed if using firestore
};

ReactDOM.render(

    <ReduxProvider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </ReactReduxFirebaseProvider>
        </ReduxProvider>,
    document.getElementById("root")
);

serviceWorker.unregister();

export default firestoreDb;
