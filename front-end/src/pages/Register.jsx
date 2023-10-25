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
  const [formValidation, setFormValidation] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleFormValidation = (errorMessage) => {
    let isValidated = true;
    if (errorMessage) {
      isValidated = false;
      if (errorMessage.includes("email"))
        setFormValidation({ ...formValidation, email: errorMessage });
      else if (errorMessage.includes("username"))
        setFormValidation({ ...formValidation, username: errorMessage });
    }
    if (form.password !== form.confirmPassword) {
      isValidated = false;
      setFormValidation({
        ...formValidation,
        confirmPassword: "Passwords do not match.",
      });
    }
    if (form.password.length < 8) {
      isValidated = false;
      setFormValidation({
        ...formValidation,
        password: "Password must be at least 8 characters.",
      });
    }
    return isValidated;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorMessage = "";
    let salt;
    try {
      const { data } = await axios.post(
        "http://localhost:4000/user/make-salt",
        {
          username: form.username,
          password: form.password,
          email: form.email,
        }
      );
      salt = data;
    } catch (error) {
      errorMessage = error.response.data.message;
    }

    if (!handleFormValidation(errorMessage)) return;

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
  };

  return (
    <div>
        <Header />
      <div className="login-modal">
        <div className="modal-header">Join StorySafeWiki</div>
        <div className="no-account">
          Already have an account,
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
          {formValidation.username ? (
            <div className="form-error-message">{formValidation.username}</div>
          ) : (
            <div></div>
          )}
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          {formValidation.email ? (
            <div className="form-error-message">{formValidation.email}</div>
          ) : (
            <div></div>
          )}
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              pattern="[a-zA-Z0-9]{3,}"
              id="password"
              placeholder="Password"
              required
              aria-label="password"
              onChange={handleChange}
            />
          </div>
          {formValidation.password ? (
            <div className="form-error-message">{formValidation.password}</div>
          ) : (
            <div></div>
          )}
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              pattern="[a-zA-Z0-9]{3,}"
              id="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          </div>
          {formValidation.confirmPassword ? (
            <div className="form-error-message">
              {formValidation.confirmPassword}
            </div>
          ) : (
            <div></div>
          )}
          <div className="buttons-container">
            <Link to="/">
              <button className="cancel-btn">Cancel</button>
            </Link>
            <button
              type="submit"
              onClick={handleSubmit}
              className="register-btn"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
