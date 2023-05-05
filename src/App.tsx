import React, { useState, useEffect, createContext, useContext } from 'react';

import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, User } from 'firebase/auth';
import { Auth } from 'firebase/auth';
import axios from 'axios';

import Layout from './components/Layout';

import './App.css';

const AuthContext = createContext<Auth | null>(null);

function App() {
  const [initialized, setInitialized] = useState(false);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initialize = async () => {
      const firebaseConfig = await getFirebaseConfig();

      if (firebaseConfig) {
        const app = initializeApp(firebaseConfig);
        const authInstance = getAuth(app);
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
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [auth]);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={auth}>
      <>{user ? <Layout /> : <SignIn />}</>
    </AuthContext.Provider>
  );
}

async function getFirebaseConfig() {
  try {
    const res = await axios.get('http://localhost:8000/keys');
    return res.data;
  } catch (error) {
    console.error('Error fetching firebaseConfig:', error);
    return null;
  }
}


function SignIn() {
  const authInstance = getAuth();

  const signInWithGoogle = () => {
    if (authInstance) {
      const provider = new GoogleAuthProvider();
      signInWithPopup(authInstance, provider);
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-card">
        <h1 className="sign-in-title">Welcome to SpkEz</h1>
        <p className="sign-in-text">
          Please sign in to continue.
        </p>
        <button className="sign-in-button" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
        <p className="sign-in-warning">
          Do not violate the community guidelines or you will be banned.
        </p>
      </div>
    </div>
  );
}

function SignOut() {
  const auth = useContext(AuthContext);

  return (
    auth?.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

// function Layout() {
//   const auth = useContext(AuthContext);

//   return (
//     <>
//       <SignOut />
//       {/* Your layout components here */}
//     </>
//   );
// }

export default App;





// import React, { useState, useEffect } from 'react';

// import { initializeApp } from 'firebase/app';
// import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import axios from 'axios';

// import Layout from './components/Layout';

// import './App.css';

// function App() {
//   const [initialized, setInitialized] = useState(false);

//   useEffect(() => {
//     const initialize = async () => {
//       const firebaseConfig = await getFirebaseConfig();

//       if (firebaseConfig) {
//         initializeApp(firebaseConfig);
//       } else {
//         console.error('Failed to fetch firebaseConfig');
//       }

//       setInitialized(true);
//     };

//     initialize();
//   }, []);

//   const auth = getAuth();
//   const [user, loading, error] = useAuthState(auth);

//   if (!initialized || loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div>
//         <p>Error: {error.message}</p>
//       </div>
//     );
//   }

//   return <>{user ? <Layout /> : <SignIn />}</>;
// }

// async function getFirebaseConfig() {
//   try {
//     const res = await axios.get('http://localhost:8000/keys');
//     return res.data;
//   } catch (error) {
//     console.error('Error fetching firebaseConfig:', error);
//     return null;
//   }
// }

// function SignIn() {
//   const authInstance = getAuth();

//   const signInWithGoogle = () => {
//     if (authInstance) {
//       const provider = new GoogleAuthProvider();
//       signInWithPopup(authInstance, provider);
//     }
//   };

//   return (
//     <div className="sign-in-container">
//       <div className="sign-in-card">
//         <h1 className="sign-in-title">Welcome to SpkEz</h1>
//         <p className="sign-in-text">Please sign in to continue.</p>
//         <button className="sign-in-button" onClick={signInWithGoogle}>
//           Sign in with Google
//         </button>
//         <p className="sign-in-warning">
//           Do not violate the community guidelines or you will be banned
//         </p>
//       </div>
//     </div>
//   );
// }

// export default App;
