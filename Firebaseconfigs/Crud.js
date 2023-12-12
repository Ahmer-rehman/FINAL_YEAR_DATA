import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export const createUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User created:", user.uid);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Login an existing user with email and password
 const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User logged in:", user.uid);
    return user;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
