import firebase from 'firebase';
import firebaseConfig from './config/firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const authProvider = new firebase.auth.GoogleAuthProvider();

export { db, auth, authProvider };