import Button from "./UI/Button";
import { useRef, useState } from "react";
import "./Modal.css";

export default function RoleModal({ openDialog, placeholder, onSuccess }) {
  const dialogRef = useRef();
  const [formData, setFormData] = useState({ id: "", name: "" });
  const [delMode, setDelMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  openDialog.current = (item, doDelete = false) => {
    setDelMode(doDelete);
    if (item) {
      setFormData(item);
    } else {
      setFormData({ id: "", name: "" });
    }
    dialogRef.current.showModal();
  };

  function handleCancel() {
    setErrorMsg("");
    dialogRef.current.close();
  }

  function handleCreate() {
    if (formData.name === "") {
      setErrorMsg("Name cannot be empty");
      return;
    }

    const url = formData.id
      ? `http://localhost:8080/api/roles/${formData.id}`
      : "http://localhost:8080/api/roles";

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
      .then(response => response.json())
      .then(data => {
        console.log(formData);
        onSuccess();
        dialogRef.current.close();
      })
      .catch(error => {
        console.error("Error saving role:", error);
      });
  }

  function handleDelete() {
    const url = `http://localhost:8080/api/roles/${formData.id}`;
    const token = localStorage.getItem("token");

    fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status === 204) {
          onSuccess();
          dialogRef.current.close();
          setFormData({ id: "", name: "" });
        } else {
          return response.json().then((data) => {
            console.error('Error:', data);
          });
        }
      })
      .catch((err) => console.error(err));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrorMsg("");
  }

  return (
    <dialog ref={dialogRef} className="modal-dialog">
      <div className="modal">
        <h3 id="modal-title">
          {delMode ? `DELETE "${formData.name}"` : (formData.id === "" ? "Enter Role Name" : "Edit Role Name")}
        </h3>
        {/* {!delMode && formData.id && (
          <input type="text" name="id" value={formData.id} readOnly />
        )} */}
        {!delMode && <input
          type="text"
          name="name"
          placeholder={placeholder}
          value={formData.name}
          onChange={handleChange}
        />}
        <div className="error-div">
          {errorMsg && <p className="error">{errorMsg}</p>}
        </div>
        <div className="modal-buttons">
          <Button text="Cancel" className="delete" onClick={handleCancel} />
          <Button text="Confirm" className="confirm" onClick={!delMode ? handleCreate : handleDelete} />
        </div>
      </div>
    </dialog>
  );
}