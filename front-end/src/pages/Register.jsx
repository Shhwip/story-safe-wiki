import React from "react";
import Header from "../components/Header.jsx";
import { useState } from "react";
import axios from "axios";
import sha256 from "js-sha256";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let salt;
        try {
            const { data } = await axios.get("http://localhost:4000/user/make-salt", {
                username: form.username,
                password: form.password,
            });
            salt = data;
        } catch (error) {
            console.log(error);
        }

        try {
            const hashedPassword = sha256(form.password + salt);
            const { data } = await axios.post("http://localhost:4000/user/register", {
                username: form.username,
                email: form.email,
                password: hashedPassword,
                salt: salt,
            });
            localStorage.setItem("userSession", data.username);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div>
        <Header />
      <div className="login-modal">
        <div className="modal-header">Join StorySafeWiki</div>
        <div className="no-account">
          already have an account,
          <a href="/login"> Log In</a>
        </div>
        <div className="register-form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          </div>
          <div className="buttons-container">
            <Link to="/">
              <button className="cancel-btn">Cancel</button>
            </Link>
            <button type="submit" onClick={handleSubmit} className="register-btn">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
