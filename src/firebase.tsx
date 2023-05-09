import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, Auth, getAuth, signInWithPopup, onAuthStateChanged, User } from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from 'firebase/firestore';

import axios from 'axios';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext<{
  auth: Auth | null;
  user: User | null;
}>({ auth: null, user: null });

export function useAuth() {
  return useContext(AuthContext).auth;
}

export function useUser() {
  return useContext(AuthContext).user;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initialize = async () => {
      const firebaseConfig = await getFirebaseConfig();

      if (firebaseConfig) {
        const authInstance = initializeFirebaseApp(firebaseConfig);
        setAuth(authInstance);
      } else {
        console.error('Failed to fetch firebaseConfig');
      }

      setInitialized(true);
    };

    initialize();
  }, []);

  useEffect(() => {
    if (auth) {
      const unsubscribe = subscribeToAuthState(auth, setUser);

      return () => {
        unsubscribe();
      };
    }
  }, [auth]);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ auth, user }}>{children}</AuthContext.Provider>
  );
}

export async function getFirebaseConfig() {
  try {
    const res = await axios.get('http://localhost:8000/keys');
    return res.data;
  } catch (error) {
    console.error('Error fetching firebaseConfig:', error);
    return null;  
  }
}

export function initializeFirebaseApp(firebaseConfig: Object) {
    const app = initializeApp(firebaseConfig);
    return getAuth(app);
  }
  
  export function subscribeToAuthState(auth: Auth, setUser: React.Dispatch<React.SetStateAction<User | null>>) {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }
  
  export function signInWithGoogle(authInstance: Auth) {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authInstance, provider);
  }

  export type { Auth, User };


  export {
    getFirestore,
    collection,
    query,
    orderBy,
    onSnapshot,
    getDocs,
  };


//   getFirestore: This function returns an instance of the Firestore database. Syntax: const db = getFirestore();

// collection: This function returns a reference to a collection in the Firestore database. Syntax: const collectionRef = collection(db, 'collectionName');

// query: This function creates a query to read data from the Firestore database. Syntax: const queryRef = query(collectionRef, where('field', '==', value));

// orderBy: This function is used to order the results of a query by a specific field. Syntax: const queryRef = query(collectionRef, orderBy('field', 'asc' or 'desc'));

// onSnapshot: This function sets up a real-time listener to the query results, allowing you to receive updates when the data changes. Syntax:

// javascript
// const unsubscribe = onSnapshot(queryRef, (snapshot) => {
//   snapshot.docs.forEach((doc) => {
//     console.log(doc.data());
//   });
// });
// getDocs: This function returns a Promise that resolves with a snapshot of the queried data. Syntax:

// javascript
// const snapshot = await getDocs(queryRef);
// snapshot.docs.forEach((doc) => {
//   console.log(doc.data());
// });
// These functions are exported at the end of the firebase.tsx file and can be imported into another file using the following syntax:

// javascript
// Copy code
// import {
//   getFirestore,
//   collection,
//   query,
//   orderBy,
//   onSnapshot,
//   getDocs,
// } from './firebase';
// With these functions, you can perform various operations on the Firestore database, such as reading data from collections, querying data based on specific conditions, and listening for real-time updates.