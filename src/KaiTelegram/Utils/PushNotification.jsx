import * as firebase from 'firebase/app';
import 'firebase/messaging';
import io from 'socket.io-client';

export const initializeFirebase = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBTVNpU2VyPLkv3G6wQG4t6qW0kkcPRGyE",
    authDomain: "messagram-15779.firebaseapp.com",
    databaseURL: "https://messagram-15779.firebaseio.com",
    projectId: "messagram-15779",
    storageBucket: "",
    messagingSenderId: "351767822373",
    appId: "1:351767822373:web:e62e38d7c2f981a0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase);
}

export const askForPermissionToReceiveNotifications = async () => {
  try {
  	
  	const messaging = firebase.messaging();
    const res = await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('here is your firebase token :', token);
    return token;
  } catch (error) {
    console.error(error);
  }
}

export const socketClient = (server) => {
  const socket = io(server);
  return socket;

}
