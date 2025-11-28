import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAqdGa3XsyJfT9ZuG060yK0A8RK-nJljxQ",
    authDomain: "spotify-control-familia.firebaseapp.com",
    projectId: "spotify-control-familia",
    storageBucket: "spotify-control-familia.firebasestorage.app",
    messagingSenderId: "83431996940",
    appId: "1:83431996940:web:b8200841df52cc0028b829",
    measurementId: "G-C1G10LLCHS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const APP_ID = 'mi-grupo-familiar-spotify';
