import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {useState, useEffect, useContext, createContext } from 'react'
import { auth } from '../../firebase'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

//Provides authentication
export function AuthProvider(props){
    const { children } = props
    const [globalUser,setGlobalUser] = useState(null)
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
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            // If there's no user, empty the user state and return from this listener.
            if (!user) { return }


            //If there is a user, then check if the user has data in the database, and if they do, then fetch the data and update the global state

            try {
                setIsLoading(true)

            } catch (err) {
                console.log(err.message)
            } finally {
                setIsLoading(false)
            }
         })
        return unsubscribe
    }, [])

    const value = { globalUser, globalData, setGlobalData, isLoading, signup, login, logout }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}