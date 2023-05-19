import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, Auth, User } from 'firebase/auth';
import axios from 'axios';

type FirebaseContextType = {
  auth: Auth | null;
  firestore: Firestore | null;
  user: User | null;
};

const FirebaseContext = createContext<FirebaseContextType>({ auth: null, firestore: null, user: null });

export function useFirebase() {
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [firestore, setFirestore] = useState<Firestore | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initialize = async () => {
      const firebaseConfig = await getFirebaseConfig();

      if (firebaseConfig) {
        const firebaseApp = initializeFirebaseApp(firebaseConfig);
        setAuth(getAuth());
        setFirestore(getFirestore());
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
    <FirebaseContext.Provider value={{ auth, firestore, user }}>{children}</FirebaseContext.Provider>
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
  