import Button from "../UI/Button";
import "./LoginPage.css";
import google from "../../assets/google.svg";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../TokenContext";

const LoginPage = () => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setToken, setUser } = useContext(TokenContext);

  function handleVisible() {
    setVisible((prevVisible) => !prevVisible);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setUser(data.user);
          navigate("/dashboard");
        } else {
          alert("Invalid email or password");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  }

  return (
    <div className="login-page-container">
      <div className="login-page">
        <h1>Welcome back!</h1>
        <h2>Please enter your details</h2>
        <>
          <form>
            <div className="input-container">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-container">
              <input
                type={visible ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <i
                className={visible ? "fas fa-eye" : "fas fa-eye-slash"}
                onClick={handleVisible}
              ></i>
            </div>

            <Button text="Log In" className="login-button" onClick={handleSubmit} />
            <div className="signup-link">
              Don't have an account? <a href="/signup">Sign Up</a>
            </div>
          </form>
        </>
      </div>
    </div>
  );
};

export default LoginPage;