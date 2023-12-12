import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
//import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
//import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
  apiKey: "AIzaSyCr1LSN3c5iLLPE58sLsH-4vYfkRayeIDQ",
  authDomain: "musica-cd8fe.firebaseapp.com",
  projectId: "musica-cd8fe",
  storageBucket: "musica-cd8fe.appspot.com",
  messagingSenderId: "179643844640",
  appId: "1:179643844640:web:b0f3c82a81ac6053d79445",
  measurementId: "G-P4EW5TGZ8T"
};

const app = initializeApp(firebaseConfig);

export const Auth = getAuth(app);