import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0YFoGJkdL32Gf__3RfhOJA4K_fmb2qmU",
  authDomain: "meal-hub-3d81b.firebaseapp.com",
  projectId: "meal-hub-3d81b",
  storageBucket: "meal-hub-3d81b.appspot.com",
  messagingSenderId: "218447311015",
  appId: "1:218447311015:web:3185da2996f23777f32b82"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth();
