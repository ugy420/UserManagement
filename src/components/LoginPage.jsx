import Button from "./Button";
import "./LoginPage.css";
import google from "../assets/google.svg";
import { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

const LoginPage = () => {

  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  // const [ user, setUser ] = useState([]);
  // const [ profile, setProfile ] = useState([]);
  
  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => setUser(codeResponse),
  //   onError: (error) => console.log('Login Failed:', error)
  // });

  // useEffect(
  //   () => {
  //       if (user) {
  //           axios
  //               .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
  //                   headers: {
  //                       Authorization: `Bearer ${user.access_token}`,
  //                       Accept: 'application/json'
  //                   }
  //               })
  //               .then((res) => {
                    
  //               })
  //               .catch((err) => console.log(err));
  //       }
  //   },
  //   [ user ]
  // );

  // log out function to log the user out of google and set the profile array to null
  // const logOut = () => {
  //     googleLogout();
  //     setProfile(null);
  // };



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
          localStorage.setItem("token", data.token);
          console.log(data.token);
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

            <Button text="Log In" className="login-button" onClick={handleSubmit}/>
            <Button text="Login In with Google" className="login-google" onClick={handleSubmit}>
              <img src={google} className="google-logo" />
            </Button>
            <div className="signup-link">
              Don't have an account? <a href="/signup">Sign Up</a>
            </div>
          </form>
        </>
      </div>
    </div>
  );
};

export default LoginPage;;
