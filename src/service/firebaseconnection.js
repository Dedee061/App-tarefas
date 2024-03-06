import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
    console.log('connection sucessfully established🔥')
  }

  export default firebase
