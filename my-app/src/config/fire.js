  
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAxeUUn4T7UzfDROJv5AnCIBlePApJXKaI",
    authDomain: "socialmediaapp-f8c7e.firebaseapp.com",
    projectId: "socialmediaapp-f8c7e",
    storageBucket: "socialmediaapp-f8c7e.appspot.com",
    messagingSenderId: "331178318299",
    appId: "1:331178318299:web:795932875b9d014263effe",
    measurementId: "G-0HDBFDD5ZY"
};

const fire = firebase.initializeApp(config);
export default fire;