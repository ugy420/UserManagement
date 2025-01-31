import Button from "./UI/Button";
import { useRef, useState, useEffect, useContext } from "react";
import { TokenContext } from "./TokenContext";
import "./UserModal.css"; // Import the CSS file

export default function UserModal({ openDialog, placeholder, onSuccess }) {
  const dialogRef = useRef();
  const { user } = useContext(TokenContext);
  const [agencies, setAgencies] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    agency_id: "",
    phone_number: "",
    cid: "",
    createdBy: user ? user.id : null,
  });
  const [error, setError] = useState({});
  
  useEffect(() => {
    fetchAgencies();
  }, []);

  function fetchAgencies() {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/agencies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAgencies(data))
      .catch((err) => console.error("Error fetching agencies:", err));
  }

  openDialog.current = (item) => {
    if (item) {
      const agency = agencies.find((agency) => agency.name === item.agency_name);
      setFormData({
        id: item.id,
        username: item.name,
        email: item.email,
        agency_id: agency ? agency.id : "",
        phone_number: item.phone,
        cid: item.cid,
        createdBy: item.createdBy,
      });
    } else {
      setFormData({
        id: "",
        username: "",
        email: "",
        password: "",
        agency_id: "",
        phone_number: "",
        cid: "",
        createdBy: user ? user.id : null,
      });
    }
    dialogRef.current.showModal();
  };

  function handleCancel() {
    dialogRef.current.close();
  }

  // Validation logic
  function validateForm() {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required!";
    }

    if (!formData.email) {
      newErrors.email = "Email is required!";
    } else {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address!";
      }
    }

    if (!formData.agency_id) {
      newErrors.agency_id = "Agency is required!";
    }

    if (!formData.phone_number) {
      newErrors.phone_number = "Phone number is required!";
    } else {
      const phoneRegex = /^[0-9]{8}$/;
      if (!phoneRegex.test(formData.phone_number)) {
      newErrors.phone_number = "Phone number must be exactly 8 digits long!";
      }
    }

    if (!formData.cid) {
      newErrors.cid = "CID is required!";
    } else {
      const cidRegex = /^[0-9]{11}$/;
      if (!cidRegex.test(formData.cid)) {
        newErrors.cid = "CID must be exactly 12 digits long!";
      }
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  }
  function handleCreate() {
    if (!validateForm()) {
      return;
    }
  
    const url = formData.id
      ? `http://localhost:8080/api/users/${formData.id}`
      : "http://localhost:8080/api/users";
  
    const method = formData.id ? "PUT" : "POST";
    const token = localStorage.getItem("token");
  
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.error);
          });
        }
        return response.json();
      })
      .then(data => {
        onSuccess();
        dialogRef.current.close();
      })
      .catch(error => {
        setError({ general: error.message });
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <dialog ref={dialogRef} className="modal-dialog">
      <div className="modal">
        <h3 id="user-title">
          {formData.id === "" ? "Add New User" : "Edit User Details"}
        </h3>
        {/* {formData.id && (
          <input type="text" name="id" value={formData.id} readOnly />
        )} */}
        <input
          type="text"
          name="username"
          placeholder={placeholder.username || "Enter username"}
          value={formData.username}
          onChange={handleChange}
          className={error.username ? "error-input" : ""}
        />
        <input
          type="email"
          name="email"
          placeholder={placeholder.email || "Enter email"}
          value={formData.email}
          onChange={handleChange}
          className={error.email ? "error-input" : ""}
        />
        <select
          name="agency_id"
          value={formData.agency_id}
          onChange={handleChange}
          className={error.agency_id ? "error-input" : ""}
        >
          <option value="">Select Agency</option>
          {agencies.map((agency) => (
            <option key={agency.id} value={agency.id}>
              {agency.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="phone_number"
          placeholder="Enter phone number"
          value={formData.phone_number}
          onChange={handleChange}
          className={error.phone_number ? "error-input" : ""}
        />
        <input
          type="text"
          name="cid"
          placeholder="Enter CID"
          value={formData.cid}
          onChange={handleChange}
          className={error.cid ? "error-input" : ""}
        />
        <div className="modal-buttons">
          <Button text="Cancel" className="delete" onClick={handleCancel} />
          <Button text="Confirm" className="confirm" onClick={handleCreate} />
        </div>
        {error.general && <div className="error-message">{error.general}</div>}
        {Object.values(error).map((err, index) => (
          err && <div key={index} className="error-message">{err}</div>
        ))}
      </div>
    </dialog>
  );
}
