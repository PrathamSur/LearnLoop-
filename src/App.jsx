import "./index.css";
import Navbar from "./Components/Navbar";
import Content from "./Components/Content";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Class from "./pages/Classrooms";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import WhiteBoard from "./pages/WhiteBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/classrooms" element={<Class />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
