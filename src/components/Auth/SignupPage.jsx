import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phoneNumber: "",
    cid: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    alert("Signup details submitted!");
    // Handle your API or authentication logic here
    // If signup is successful, navigate to login page
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.header}>Signup Page</h2>
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
          <label style={styles.label}>
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            CID:
            <input
              type="text"
              name="cid"
              value={formData.cid}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </label>
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
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
        <button
          onClick={() => navigate("/login")}
          style={{ ...styles.button, backgroundColor: "#6c757d" }}
        >
          Back
        </button>
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
};

export default SignupPage;
