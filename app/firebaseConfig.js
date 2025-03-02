// Firebase-Konfiguration
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Deine Firebase-Konfigurationsdaten (Ersetze mit deinen echten Daten)
const firebaseConfig = {
  apiKey: "DEIN_API_KEY",
  authDomain: "DEIN_AUTH_DOMAIN",
  projectId: "DEIN_PROJECT_ID",
  storageBucket: "DEIN_STORAGE_BUCKET",
  messagingSenderId: "DEIN_MESSAGING_SENDER_ID",
  appId: "DEIN_APP_ID"
};

// Initialisiere Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
