import firebase from 'firebase';
import 'firebase/app';


const config = {
    apiKey: "AIzaSyD-UqxN1kq9jKlTRl7v0vV3kV8O4mnYIhM",
    authDomain: "trivia-quiz-4a9e2.firebaseapp.com",
    databaseURL: "https://trivia-quiz-4a9e2.firebaseio.com",
    projectId: "trivia-quiz-4a9e2",
    storageBucket: "trivia-quiz-4a9e2.appspot.com",
    messagingSenderId: "551914634081"
  };

 firebase.initializeApp(config);

 const db = firebase.firestore();
 
 db.settings({
     timestampsInSnapshots: true
   });
   
 export
 {
     firebase,
     db
 }
 
