import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAX9f5EZmtfBKbI_17V9rUmISs_Nz0GhKQ',
  authDomain: 'muso-86ef8.firebaseapp.com',
  projectId: 'muso-86ef8',
  storageBucket: 'muso-86ef8.appspot.com',
  messagingSenderId: '845014415488',
  appId: '1:845014415488:web:92359df6f3e6a830aa4e65'
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
