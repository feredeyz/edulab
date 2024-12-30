import HomePage from "./HomePage.jsx";
import LoginPage from "./LoginPage.jsx";
import RegistrationPage from "./RegistrationPage.jsx";
import User from "./User.jsx";
import AddCourse from "./AddCourse.jsx";
import Courses from "./Courses.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<User />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/add-course" element={<AddCourse />} />
      </Routes>
    </Router>
  )
};