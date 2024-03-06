import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyCfNm_IVqtWzkUEUc7xrlVFJ8zZrz_oCe8",
    authDomain: "app-tarefas-82d93.firebaseapp.com",
    projectId: "app-tarefas-82d93",
    storageBucket: "app-tarefas-82d93.appspot.com",
    messagingSenderId: "235942277714",
    appId: "1:235942277714:web:a98a09b59371a8fb95e58b",
    measurementId: "G-EPHVTSWZ8E"
  };

  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
    console.log('connection sucessfully established🔥')
  }

  export default firebase