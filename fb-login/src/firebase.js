import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { initializeApp } from 'firebase/app'
import { useState, useEffect, useContext, createContext } from 'react'

export const firebaseConfig = initializeApp({
    apiKey: "AIzaSyDrarRzmStx9URNFqhpO3MdpblPDqMRIvw",
    authDomain: "exercises-tracker-7d9b1.firebaseapp.com",
    projectId: "exercises-tracker-7d9b1",
    storageBucket: "exercises-tracker-7d9b1.appspot.com",
    messagingSenderId: "87044403218",
    appId: "1:87044403218:web:d12b612ab29783533c28cb",
    measurementId: "G-PGZCVYSNNH"
  });

export const AuthContext = createContext()

export const AuthContextProvider = props => {
    const [user, setUser] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError)
        return () => unsubscribe()
    }, [])
    return <AuthContext.Provider value={{ user, error }} {...props} />
}

export const useAuthState = () => {
    const auth = useContext(AuthContext)
    return {...auth, isAuthenticated: auth.user != null }
}
