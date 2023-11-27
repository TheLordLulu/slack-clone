// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';




const firebaseConfig = {
  apiKey: "AIzaSyAFe8ICYSEf0MyNpC1ss_x7wOcY3Gvri7Q",
  authDomain: "slack-clone-11cb0.firebaseapp.com",
  projectId: "slack-clone-11cb0",
  storageBucket: "slack-clone-11cb0.appspot.com",
  messagingSenderId: "213311127454",
  appId: "1:213311127454:web:7029580f5ab947faafe08f",
  measurementId: "G-SZ84P4FB73"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();

  export {auth, provider, db,};