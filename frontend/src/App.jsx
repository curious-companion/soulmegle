import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { AuthProvider } from "./context/authProvider";
import SelectInterest from "./pages/select_Interest";

function App() {
  const handleInterestSelection = (interest)=>{
    console.log("User selected Interest:", interest);
  };


  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/select-interest" element={<SelectInterest onSelect={handleInterestSelection} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
