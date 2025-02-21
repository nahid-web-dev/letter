// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, setDoc, doc, addDoc, getDoc, updateDoc, increment } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFuVxPXGOmYiq04DdcsydSoFET6nhftSo",
  authDomain: "test-fire-access.firebaseapp.com",
  projectId: "test-fire-access",
  storageBucket: "test-fire-access.firebasestorage.app",
  messagingSenderId: "44394012724",
  appId: "1:44394012724:web:51ba8ad7a3a34d00feea61",
  measurementId: "G-F1RQYTCTV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)


const signUpWithRole = async (email, password, role) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add user data with role to Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: role, // Assign a role like "admin" or "user"
    });

    console.log("User registered with role:", role);
  } catch (error) {
    console.log("Error signing up:", error.message);
  }
};

const addData = async () => {
  try {
    const docRef = doc(db, "sabnam", "clickCounter");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // If the document exists, increment the 'clicks' field  
      await updateDoc(docRef, {
        clicks: increment(1)
      });
      console.log("Clicks incremented!");
    } else {
      // If the document doesn't exist, create it with initial clicks value  
      await setDoc(docRef, { clicks: 1 });
      console.log("Document created with initial clicks value!");
    }
  } catch (error) {
    console.log("Error updating document:", error?.message);
  }
};

export { signUpWithRole, auth, addData, db }