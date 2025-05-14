// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcBsc8SRFoWRVTNXYUGD2xDq5Ki8fzK9k",
  authDomain: "ecommerce-3d4a0.firebaseapp.com",
  projectId: "ecommerce-3d4a0",
  storageBucket: "ecommerce-3d4a0.appspot.com",
  messagingSenderId: "1026775405322",
  appId: "1:1026775405322:web:69421939f6e5d4f4a6a0f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app