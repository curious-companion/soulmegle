import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useEffect, useState } from "react";

const CheckAuth = ()=>{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((currentUser)=>{
            if(currentUser){
                setUser(currentUser);
                navigate("/select-interest");
            }else{
                setUser(null);
                navigate("/");
            }
            setLoading(false);
        });
        return unsubscribe;
    }, [navigate]);

    if(loading){
        return(
            <div>Loading ...</div>
        )
    }
    return(
        <></>
    )
};

export default CheckAuth;
