
import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "../styles/auth.css"; 
import ParticlesBackground from "../components/ParticlesBackground";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login, GoogleSignIn } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);    
    console.log("Logging in with:", email, password);
    navigate("/select-interest")
  };

  const handleGoogleSignIn = async()=>{
    try{
      console.log("Attempting Google SignIn")
      await GoogleSignIn();
      navigate("/select-interest");
    }catch(err){
      console.error("An error occured while signing in with Google", err.message);
    }
  };

  return (
    <div className="auth-container">
      <ParticlesBackground />
      <div className="auth-content">
        <h2 className="auth-heading">Login to SoulMegle</h2>
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="button button-primary">
            Login
          </button>
        </form>

        <button 
          className="button button-google"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle size={20} style={{ marginRight: "10px" }} />
          Sign in with Google
        </button> 

        <p className="auth-footer">
          Dont have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
