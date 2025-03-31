// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY as string,
  authDomain: import.meta.env.VITE_AUTHDOMAIN as string,
  projectId: import.meta.env.VITE_PROJECTID as string,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET as string,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID as string,
  appId: import.meta.env.VITE_APIID as string,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
