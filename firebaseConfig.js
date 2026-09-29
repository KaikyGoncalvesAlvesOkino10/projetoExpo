import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAWPqFr2fVJueRQYEbKMuHcmG64gGCHQxQ",
  authDomain: "projeto-a2954.firebaseapp.com",
  projectId: "projeto-a2954",
  storageBucket: "projeto-a2954.firebasestorage.app",
  messagingSenderId: "1071083654878",
  appId: "1:1071083654878:web:c0a67019b0815f30423c4f",

  // URL do Realtime Database
  databaseURL: "https://projeto-a2954-default-rtdb.firebaseio.com"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Authentication
const auth = getAuth(app);

// Inicializa o Realtime Database
const database = getDatabase(app);

// Exporta os serviços
export {
  app,
  auth,
  database
};