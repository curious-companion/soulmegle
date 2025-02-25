import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { AuthProvider } from "./context/authProvider";
import SelectInterest from "./pages/select_Interest";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/select-interest" element={<SelectInterest />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
