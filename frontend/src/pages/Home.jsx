import ParticlesBackground from "../components/ParticlesBackground";
import "../styles/home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/authContext";

const Home = () => {
  const navigate = useNavigate();
  const[error, setError] = useState(null);
  const { skipSignIn } = useAuth();

  const handleSkipSignIn = async () => {
    try{
      await skipSignIn();
      navigate("/select-interest");
    }catch(error){
      console.error("Error skipping sign in", error.message);
      setError("Failed to skip sign in");
    }
    
  }

  return (
    <div className="home-container">
      <ParticlesBackground />

      <div className="home-content">
        <h1 className="home-heading">Welcome to SoulMegle!</h1>
        <p className="home-subheading">
          Connect with random people who share similar interests. Start chatting now!
        </p>

        <div className="buttons-container">
          <Link to="/login" className="button button-primary">
            Login
          </Link>
          <Link to="/register" className="button button-secondary">
            Sign Up
          </Link>
          <button className="button button-skip" onClick={handleSkipSignIn} >Skip Sign In</button>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;
