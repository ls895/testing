import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyC99KJxf2fKHs80BkUtwvI58RM05dfW5WU",
  authDomain: "udacity-neighbor-map.firebaseapp.com",
  databaseURL: "https://udacity-neighbor-map.firebaseio.com",
  storageBucket: "udacity-neighbor-map.appspot.com",
  messagingSenderId: "921650015202"
};

firebase.initializeApp(config);

export const database = firebase.database();
