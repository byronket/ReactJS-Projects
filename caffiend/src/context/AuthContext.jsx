import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {useState, useEffect, useContext, createContext } from 'react'
import { auth } from '../../firebase'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider(props){
    const { children } = props
    const [user,setUser] = useState(null)
    const [globalData, setGlobalData]  = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    function signup(email,password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        setUser(null)
        setGlobalData(null)
        signOut(auth)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async () => { })
        return unsubscribe(7:03:24)
    }, [])

    const value = { user, globalData, setGlobalData, isLoading, signup, login, logout }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}