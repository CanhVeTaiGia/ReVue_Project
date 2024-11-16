// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_KEY_FIREBASE,
  authDomain: "data-cvtg.firebaseapp.com",
  projectId: "data-cvtg",
  storageBucket: "data-cvtg.appspot.com",
  messagingSenderId: "202169001972",
  appId: "1:202169001972:web:cfd543cad2f177e919bba1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default app;