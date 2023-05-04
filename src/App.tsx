import React from 'react'
import { useState } from 'react'

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'


import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

import './App.css'

function App() {

  return (
    <>
      <p>Hello world!</p>
    </>
  )
}

export default App
