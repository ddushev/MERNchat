import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import SignUp from "./pages/signup/signUp";
import Login from "./pages/login/login";

function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
