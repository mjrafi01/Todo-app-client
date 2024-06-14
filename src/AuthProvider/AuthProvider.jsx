
import { getAuth,signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider,createUserWithEmailAndPassword ,onAuthStateChanged,signOut} from "firebase/auth";
import { createContext, useEffect, useState,  } from "react";
import { app } from '../firebase/firebase.config';


export const AuthContext=createContext(null)
const auth=getAuth(app)
export const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const googleProvider = new GoogleAuthProvider();

const signIn=(email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
}
const googleLogin=()=>{
return signInWithPopup(auth, googleProvider);
}

const createUser=(email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password)
}
useEffect(()=>{
    const unsubscribe =onAuthStateChanged(auth,currentUser=>{
        if (currentUser) {
            setUser(currentUser)
            setLoading(false)
            console.log(currentUser)
        }else{
            setLoading(false)
        }
    })
    return ()=>{
        return unsubscribe();
    }
  },[])
  const logout=()=>{
    return signOut(auth).then(()=> setUser(null))
  }
const authInfo={signIn,googleLogin,createUser,user,loading,logout}

  return (
  <AuthContext.Provider value={authInfo}>
    {children}
  </AuthContext.Provider>
  )
}
