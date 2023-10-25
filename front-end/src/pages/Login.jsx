import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import sha256 from "js-sha256";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [formValidation, setFormValidation] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleFormValidation = (errorMessage) => {
    let isValidated = true;

    if (errorMessage) {
      isValidated = false;
      if (errorMessage.includes("username"))
        setFormValidation({ ...formValidation, password: errorMessage });
    }
    return isValidated;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let salt;
    let errorMessage = "";
    try {
      const { data } = await axios.post("http://localhost:4000/user/get-salt", {
        username: form.username,
      });
      salt = data;
    } catch (error) {
      errorMessage = error.response.data.message;
    }

    if (!handleFormValidation(errorMessage)) return;

    try {
      const hashedPassword = sha256(form.password + salt);
      const { data } = await axios.post("http://localhost:4000/user/login", {
        username: form.username,
        password: hashedPassword,
      });
      navigate("/");
      localStorage.setItem("userSession", data.username);
    } catch (error) {
      errorMessage = error.response.data.message;
      setFormValidation({ ...formValidation, password: errorMessage });
    }
  };

  return (
    <div>
      <div className="login-modal">
        <div className="modal-header">Welcome Back!</div>
        <div className="no-account">
          Don&apos;t have an account,
          <a href="/register"> Sign Up</a>
        </div>
        <div className="login-form">
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
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          {formValidation.password ? (
            <div className="form-error-message">{formValidation.password}</div>
          ) : (
            <div></div>
          )}
          <div className="buttons-container">
            <Link to="/">
              <button className="cancel-btn">Cancel</button>
            </Link>
            <button type="submit" onClick={handleSubmit} className="login-btn">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
