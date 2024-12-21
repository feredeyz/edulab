import HomePage from "./HomePage.jsx";
import LoginPage from "./LoginPage.jsx";
import RegistrationPage from "./RegistrationPage.jsx";
import User from "./User.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  )
};