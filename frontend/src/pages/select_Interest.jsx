import { useState } from "react";
import "../styles/selectInterest.css";
import ParticlesBackground from "../components/ParticlesBackground";

const interests = ["Sports", "Technology", "Coding", "Entertainment"];

const SelectInterest = ({ onSelect }) => {
    const[ selectedInterest, setSelectedInterest ] = useState(null);

    const handleSelectInterest = (interest) => {
        setSelectedInterest(interest);
        onSelect(interest);
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