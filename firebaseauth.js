
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyBu7bJV82hBPOJYc5r8ILIXfnqQsofnnQg",
  authDomain: "login-form-b51e0.firebaseapp.com",
  projectId: "login-form-b51e0",
  storageBucket: "login-form-b51e0.appspot.com", 
  messagingSenderId: "498618018976",
  appId: "1:498618018976:web:74723dbd1ed719bd656dc5"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


document.getElementById("signupBtn").addEventListener("click", async () => {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const message = document.getElementById("statusMessage");

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      uid: user.uid
    });

    message.textContent = "Sign-up successful!";
    message.style.color = "green";
    toggleLogout(true);
  } catch (error) {
    message.textContent = error.message;
    message.style.color = "red";
  }
});

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const message = document.getElementById("statusMessage");

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    message.textContent = "Login successful!";
    message.style.color = "green";
    window.location.href = "../main.html";
    toggleLogout(true);
  } catch (error) {
    message.textContent = error.message;
    message.style.color = "red";
  }
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  document.getElementById("statusMessage").textContent = "Logged out!";
  toggleLogout(false);
});

function toggleLogout(show) {
  document.getElementById("logoutBtn").style.display = show ? "block" : "none";
}