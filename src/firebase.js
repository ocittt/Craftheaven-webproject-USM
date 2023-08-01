import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDUhrMTlBeGNj16YJMrGXtW6IWmSFhnodQ",
  authDomain: "crafthaven-856e9.firebaseapp.com",
  databaseURL: "https://crafthaven-856e9-default-rtdb.firebaseio.com",
  projectId: "crafthaven-856e9",
  storageBucket: "crafthaven-856e9.appspot.com",
  messagingSenderId: "675571869187",
  appId: "1:675571869187:web:0ad4e4f9f70cbd27fcd036",
  measurementId: "G-D28982HHMF",
};

export const initilizeFirebase = () => {
  const app = initializeApp(firebaseConfig);
};

export const firebaseApp = initializeApp(firebaseConfig);
