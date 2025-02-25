import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../styles/selectInterest.css";
import ParticlesBackground from "../components/ParticlesBackground";
import { useNavigate } from "react-router-dom";

const interests = ["Sports", "Technology", "Coding", "Entertainment"];

const SelectInterest = () => {
    const [ selectedInterest, setSelectedInterest ] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                setUserId(user.uid);
            }else{
                console.error("User not logged in")
            }
        });

        return () => unsubscribe();
    }, []);


    const handleSelectInterest = async(interest) => {
        if(!userId){
            console.error("User Id not found, cannot update interest");
            return;
        }

        setSelectedInterest(interest);

        try{
            const response = await fetch("http://localhost:5000/update-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id: userId, interests: [interest] }),
            });

            const data = await response.json();
            if(response.ok){
                console.log("Interest saved successfully", data);
            }else{
                console.error("Failed to save Interest", data);
            }
        }catch(error){
            console.error("Error saving Interest",  error);
        }
    };

    return(
        <div className="select-interest-container">
            <ParticlesBackground />
            <h2> Select your Interest </h2>
            <div className="interests-list">
                {interests.map((interest)=>(
                    <button
                        key={interest}
                        className={`interest-item ${
                            selectedInterest === interest ? "selected" : ""
                        }`}
                        onClick={()=>handleSelectInterest(interest)}
                    >
                        {interest}
                    </button>
                ))}
            </div>
        </div>
    );
};


export default SelectInterest;