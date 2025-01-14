import Button from "./Button";
import "./LoginPage.css";
import google from "../assets/google.svg";

const LoginPage = () => {
  return (
    <div className="login-page">
      <div>
        <h2>Welcome back!</h2>
        <h3>Please enter your details</h3>
        <>
          <form>
            <div className="input-container">
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
              />
            </div>

            <div className="input-container">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>

            <Button text="Log In" className="login-button" />
            <Button text="Login In with Google" className="login-google">
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

export default LoginPage;
