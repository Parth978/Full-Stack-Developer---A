// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJ6WzgzTL00ki2FhAd-5UwPlPU5yNrZJ4",
  authDomain: "quiz-app-43c9d.firebaseapp.com",
  projectId: "quiz-app-43c9d",
  storageBucket: "quiz-app-43c9d.appspot.com",
  messagingSenderId: "3777600738",
  appId: "1:3777600738:web:fe11a6404ef0308e9652bb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();


export const signIn = async (email,password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  }
};

export const signUp = async (email,password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User Successfull Loggedin", user);
    return null;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return `${errorCode} + ${errorMessage}`;
  }
};

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = provider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      return null;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      return `${errorCode} + ${errorMessage}`;
    });
};
