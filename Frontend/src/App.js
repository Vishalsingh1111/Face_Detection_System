
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FaceMatching from "./Components/FaceMatching";
import UserRegistration from "./Components/UserRegistration";
import AdminLogin from "./Components/AdminLogin";
import AdminRegister from "./Components/AdminRegister";
import AdminPage from "./Components/AdminPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FaceMatching />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
      </Routes>
    </Router>
  );
};

export default App;
