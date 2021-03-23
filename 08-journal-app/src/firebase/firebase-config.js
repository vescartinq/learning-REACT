import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// En desarrollo utilizará .env.development , en testing utilizará .env.test (281)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

// const firebaseConfigTesting = {
//   apiKey: 'xxxxxxxx',
//   authDomain: 'xxxxxxxx',
//   projectId: 'xxxxxxxx',
//   storageBucket: 'xxxxxxxxxx',
//   messagingSenderId: 'xxxxxxxx',
//   appId: 'xxxxxxxxx',
// };

// if (process.env.NODE_ENV === 'test') {
//   // testing
//   firebase.initializeApp(firebaseConfigTesting);
// } else {
//   // dev/prod
//   firebase.initializeApp(firebaseConfig);
// }

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
