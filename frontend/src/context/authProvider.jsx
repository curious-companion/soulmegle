import { useState, useEffect, createContext } from "react";
import { auth, googleProvider } from "../../firebaseConfig";
import { 
    signInWithEmailAndPassword, 
    getRedirectResult,
    createUserWithEmailAndPassword, 
    signOut,
    signInWithPopup,
    signInWithRedirect,
    signInAnonymously
} from "firebase/auth";


export const AuthContext = createContext();

const saveUserToSupabase = async (user)=>{
    if(!user){
        return;
    }
    
    try{
        const firebaseToken = await user.getIdToken();

        const response = await fetch("http://localhost:5000/save-user",{
            method:"POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify({ firebaseToken }),
        });

        const data = await response.json();
        console.log("User saved to Supabase:", data);
    }catch(error){
        console.error("Error in saving data to Supabase", error);
    }
};


export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(async (user)=>{
            setUser(user);
            setLoading(false);
            if(user){
                saveUserToSupabase(user);
            }
        });

        getRedirectResult(auth)
            .then(async (result) => {
                if(result?.user){
                    console.log("User Logged in", result.user);
                    saveUserToSupabase(result.user);
                    setUser(result.user);
                }
            })
            .catch((error) => {
                console.error("Error getting redirect result", error.message);
            });

        return () => unsubscribe();
    }, []);


    const login = async(email , password)=>{
        setLoading(true);
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            console.log("User Logged in", userCredential.user);
            await saveUserToSupabase(userCredential.user);
        }catch(error){
            console.error("Error signing in", error.message);
        }finally{
            setLoading(false);
        }
    }
    
    const signUp = async(email, password) =>{
        setLoading(true);
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            console.log("User Signed up", userCredential.user);
            await saveUserToSupabase(userCredential.user);
        }catch(error){
            console.error("Error signing up", error.message);
        }finally{
            setLoading(false);
        }
    }
    
    const logout = async() =>{
        setLoading(true);
        try{
            await signOut(auth);
            setUser(null);
            console.log("User Signed out");
        }catch(error){
            console.error("Error logging out", error.message);
        }finally{
            setLoading(false);
        }
    }

    const GoogleSignIn = async()=>{
        setLoading(true);
        try{
            console.log("Attempting Google SignIn");
            const userCredential = await signInWithPopup(auth, googleProvider);
            setUser(userCredential.user);
            console.log("User logged in", userCredential.user);
            await saveUserToSupabase(userCredential.user);
        }catch(err){
            console.error("Error signing in with Google", err.message);
        }finally{
            setLoading(false);
        }
    };

    const googleSignInWithRedirect = async()=>{
        setLoading(true);
        try{
            console.log("Attempting to Google SignIn with Redirect");
            const userCredential = await signInWithRedirect(auth, googleProvider);
            console.log("User Logged in", userCredential.user);
        }catch(err){
            console.error("Error signing in with Google", err.message);
        }finally{
            setLoading(false);
        }
    }

    const skipSignIn = async() => {
        setLoading(true);
        try{
            const userCredential = await signInAnonymously(auth);
            setUser(userCredential.user);
            console.log("User Signed in Anonymously", userCredential.user);
            await saveUserToSupabase(userCredential.user);
        }catch(error){
            console.error("Error signing in anonymously", error.message);
        }finally{
            setLoading(false);
        }
    }
    
    return (
        <AuthProvider value={{user, login, signUp, logout, GoogleSignIn, googleSignInWithRedirect, skipSignIn}}>
            {!loading && children}
        </AuthProvider>
    );
};

