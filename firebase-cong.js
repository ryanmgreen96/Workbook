// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAm1bkAkchNPuXvPTXeXtaMh2DDnjuYtto",
  authDomain: "workbookmain.firebaseapp.com",
  projectId: "workbookmain",
  storageBucket: "workbookmain.firebasestorage.app",
  messagingSenderId: "816618328436",
  appId: "1:816618328436:web:b7ab976cdd392fd6961c21",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
