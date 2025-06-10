import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDuBcMzzWR_IWBwPXxtWDfAKG02cb9MOrY",
  authDomain: "retrovibe-29b13.firebasestorage.app",
  projectId: "retrovibe-29b13",
  storageBucket: "retrovibe-29b13.firebasestorage.app", 
  messagingSenderId: "89369444065",
  appId: "1:89369444065:web:d8408796b499dbc24881a0"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
