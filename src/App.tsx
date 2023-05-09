import React from 'react';
import Layout from './components/Layout';
import './App.css';

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

function SignIn({ auth }: { auth: Auth | null }): any {
  const handleSignInWithGoogle = () => {
    if (auth) {
      signInWithGoogle(auth);
    }
  };

  // ... (existing code)
}

export default App;
