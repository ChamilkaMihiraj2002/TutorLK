import React from "react";
import { Routes, Route } from "react-router-dom";
import AppNavbar from './Components/Navbar/Navbar'
import Home from "./Pages/Home page/Home";

const About: React.FC = () => <h2 className="m-4">About Page</h2>;
const Services: React.FC = () => <h2 className="m-4">Services Page</h2>;
const Contact: React.FC = () => <h2 className="m-4">Contact Us Page</h2>;
const Login: React.FC = () => <h2 className="m-4">Login Page</h2>;
const SignUp: React.FC = () => <h2 className="m-4">Sign Up Page</h2>;

function App() {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

    </>
  )
}

export default App
