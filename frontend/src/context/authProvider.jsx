import { useState, useEffect, createContext, useContext } from "react";
import { auth, googleProvider } from "../../firebaseConfig";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut,
    signInWithPopup,
    signInWithRedirect
} from "firebase/auth";


export const AuthContext = createContext();




export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((user)=>{
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);



    const login = async(email , password)=>{
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            console.log("User Logged in", userCredential.user);
        }catch(error){
            console.error("Error signing in", error.message);
        }
    }
    
    const signUp = async(email, password) =>{
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            console.log("User Signed up", userCredential.user);
        }catch(error){
            console.error("Error signing up", error.message);
        }
    }
    
    const logout = async() =>{
        try{
            await signOut(auth);
            setUser(null);
            console.log("User Signed out");
        }catch(error){
            console.error("Error logging out", error.message);
        }
    }

    const GoogleSignIn = async()=>{
        try{
            console.log("Attempting Google SignIn");
            const userCredential = await signInWithPopup(auth, googleProvider);
            setUser(userCredential.user);
            console.log("User logged in", userCredential.user);
        }catch(err){
            console.error("Error signing in with Google", err.message);
        }
    };

    const googleSignInWithRedirect = async()=>{
        try{
            console.log("Attempting to Google SignIn with Redirect");
            const userCredential = await signInWithRedirect(auth, googleProvider);
            setUser(userCredential.user);
            console.log("User Logged in", userCredential.user);
        }catch(err){
            console.error("Error signing in with Google", err.message);
        }
    }
    
    return (
        <AuthContext.Provider value={{user, login, signUp, logout, GoogleSignIn, googleSignInWithRedirect}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

