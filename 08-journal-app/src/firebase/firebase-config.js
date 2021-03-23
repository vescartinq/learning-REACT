import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAY3hCYSbzDd04tQ8uIsfLrLEAUH7oBd6A',
  authDomain: 'learning-react-f3c35.firebaseapp.com',
  projectId: 'learning-react-f3c35',
  storageBucket: 'learning-react-f3c35.appspot.com',
  messagingSenderId: '584769417491',
  appId: '1:584769417491:web:84be0d1aae4ed82f42eae6',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// const githubAuthProvider = new firebase.auth.GithubAuthProvider();

export { db, googleAuthProvider, firebase };
