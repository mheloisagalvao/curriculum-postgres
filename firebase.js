import * as firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBq069_cV-8VLHytgXOhCpUxNEHowVCJQA",
    authDomain: "auth-curriculum.firebaseapp.com",
    projectId: "auth-curriculum",
    storageBucket: "auth-curriculum.appspot.com",
    messagingSenderId: "269877148643",
    appId: "1:269877148643:web:2278a7d9b0951b15af7ed6",
    measurementId: "G-52LYJ85KBY"
}

firebase.initializeApp(config);

export const auth = firebase.auth

export default firebase;