
import { initializeApp } from "firebase/app";
import { getAuth}  from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyASpYR0mkiz_dikG_yYNLDajac8-0d-FAU",
  authDomain: "chat-ff20c.firebaseapp.com",
  projectId: "chat-ff20c",
  storageBucket: "chat-ff20c.appspot.com",
  messagingSenderId: "314991916207",
  appId: "1:314991916207:web:b474823b13d796f8e4105a",
  measurementId: "G-WBD3Q5BF6C"
};


export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth= getAuth(); 
export const storage = getStorage();
// export default {app,auth};
export const db = getFirestore();