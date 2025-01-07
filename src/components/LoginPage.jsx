import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    alert("Login details submitted!");
    // Handle your API or authentication logic here
    // If login is successful, navigate to user management page
    navigate("/usermanagement");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.header}>Login Page</h2>
        {!loginWithEmail ? (
          <>
            <form onSubmit={handleSubmit} style={styles.form}>
              <label style={styles.label}>
                Username:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                />
              </label>
              <label style={styles.label}>
                Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                />
              </label>
              <button type="submit" style={styles.button}>
                Login
              </button>
            </form>
            <div style={styles.buttonContainer}>
              <button
                onClick={() => setLoginWithEmail(true)}
                style={{ ...styles.button, backgroundColor: "#6c757d" }}
              >
                Login with Email
              </button>
              <button
                onClick={handleSignupClick}
                style={{
                  ...styles.button,
                  backgroundColor: "#28a745",
                  marginLeft: "10px",
                }}
              >
                Sign Up
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </label>
            <button type="submit" style={styles.button}>
              Login
            </button>
            <button
              onClick={() => setLoginWithEmail(false)}
              style={{ ...styles.button, backgroundColor: "#6c757d" }}
            >
              Login with Username
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  box: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    fontSize: "2rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
  },
  label: {
    marginBottom: "0.5rem",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    margin: "5px 0 15px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    padding: "10px",
    margin: "5px 0",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
};

export default LoginPage;
