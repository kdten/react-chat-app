import React from 'react';
import Layout from './components/Layout';
import './App.css';
import './loginpage.css';
// import the google logo from react-icons/fa
import { FaGoogle } from 'react-icons/fa';


import {
  AuthProvider,
  useAuth,
  useUser,
  signInWithGoogle,
  Auth,
} from './firebase';

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const auth = useAuth();
  const user = useUser();

  return <>{user ? <Layout /> : <SignIn auth={auth} />}</>;
}
function SignIn({ auth }: { auth: Auth | null }): React.ReactElement | null {
  const handleSignInWithGoogle = () => {
    if (auth) {
      signInWithGoogle(auth);
    }
  };

  return (
    <div className="landing-page">
      <div className="login-container">
        <h1>Welcome to Speak Easy</h1>
        <p>Please sign in with Google to continue</p>
        <button className="google-signin" onClick={handleSignInWithGoogle}>
        Sign in with&nbsp;&nbsp;
        <FaGoogle className="google-icon" />
        </button>
      </div>
    </div>
  );
}

export default App;
