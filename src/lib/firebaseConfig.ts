import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCP2NgTSvCfJWnkcDzrPF8P4Aq-fDx00Zc",
  authDomain: "zomaksh-1889c.firebaseapp.com",
  projectId: "zomaksh-1889c",
  storageBucket: "zomaksh-1889c.appspot.com",
  messagingSenderId: "629355228786",
  appId: "1:629355228786:web:2ab332044d6ce756c41ceb",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
