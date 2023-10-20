import { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import sha256 from "js-sha256";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    let salt;
    try {
      console.log(form.username);
      const { data } = await axios.post("http://localhost:4000/user/get-salt", {
        username: form.username,
      });
      salt = data;
    } catch (error) {
      console.log(error);
    }
    console.log("test");
    try {
      console.log(salt);
      const hashedPassword = sha256(form.password + salt);
      const user = await axios.post("http://localhost:4000/user/login", {
        username: form.username,
        password: hashedPassword,
      });
      navigate("/");
      localStorage.setItem("userSession", user.username);
    } catch (error) {
      console.log(error);
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
