import GoogleSignIn from "../components/GoogleSignIn";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css"; 
import ParticlesBackground from "../components/ParticlesBackground";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here (e.g., call an API or handle local authentication)
    console.log("Logging in with:", email, password);
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

        <GoogleSignIn />

        <p className="auth-footer">
          Dont have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
