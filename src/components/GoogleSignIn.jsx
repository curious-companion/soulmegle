import { auth, googleProvider } from "../firebaseConfig";
import { signInWithRedirect } from "firebase/auth";
import { useState } from "react";
import GoogleButton from "react-google-button";

const GoogleSignIn = ()=>{
    const[error, setError] = useState(null);
    const handleGoogleSignIn = async() =>{
        try{
            const result = await signInWithRedirect(auth, googleProvider);
            console.log(result.user);
        }catch(error){
            setError("Google Sign in error:" + error.message);
        }
    };

    return(
        <div>
            <GoogleButton onClick={handleGoogleSignIn} 
            style = {{ display: "block", margin: "1rem auto"}} />
            {error && <p>{error}</p>}
        </div>
    );
};

export default GoogleSignIn;