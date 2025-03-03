import { auth, db } from "./firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// 🔹 User Authentication
export const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return "Login successful";
  } catch (error) {
    throw error.message;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return "Logged out successfully";
  } catch (error) {
    throw error.message;
  }
};

// 🔹 Firestore: Store & Retrieve Locations
export const addLocation = async (location) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");

    await addDoc(collection(db, "locations"), {
      ...location,
      userId: user.uid, // Save location under logged-in user
    });

    return "Location added successfully";
  } catch (error) {
    throw error.message;
  }
};

export const getLocations = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");

    const q = query(collection(db, "locations"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error.message;
  }
};
