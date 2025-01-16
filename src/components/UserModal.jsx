import Button from "./Button";
import { useRef, useState } from "react";

export default function UserModal({ openDialog, placeholder, onSuccess }) {
  const dialogRef = useRef();
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    agency_id: "",
    phone_number: "",
    cid: "",
  });

  openDialog.current = (item) => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        id: "",
        username: "",
        email: "",
        password: "",
        agency_id: "",
        phone_number: "",
        cid: "",
      });
    }
    dialogRef.current.showModal();
  };

  function handleCancel() {
    dialogRef.current.close();
  }

  function handleCreate() {
    const url = formData.id
      ? `http://localhost:8080/api/users/${formData.id}`
      : "http://localhost:8080/api/users";

    const method = formData.id ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        onSuccess();
        dialogRef.current.close(); 
      })
      .catch((error) => {
        console.error("Error saving user:", error);
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
          {formData.id === "" ? "Enter User Details" : "Edit User Details"}
        </h3>
        {formData.id && (
          <input type="text" name="id" value={formData.id} readOnly />
        )}
        <input
          type="text"
          name="username"
          placeholder={placeholder.username || "Enter username"}
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder={placeholder.email || "Enter email"}
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="agency_id"
          placeholder="Enter agency ID"
          value={formData.agency_id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Enter phone number"
          value={formData.phone_number}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cid"
          placeholder="Enter CID"
          value={formData.cid}
          onChange={handleChange}
        />
        <div className="modal-buttons">
          <Button text="Cancel" className="delete" onClick={handleCancel} />
          <Button text="Confirm" className="confirm" onClick={handleCreate} />
        </div>
      </div>
    </dialog>
  );
}
