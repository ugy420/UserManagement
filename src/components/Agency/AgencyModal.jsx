import Button from "../UI/Button";
import { useRef, useState } from "react";
import { fetchData } from "../../utils/apiUtils.js";

export default function AgencyCreate({ openDialog, placeholder, onSuccess }) {
  const dialogRef = useRef();
  const [formData, setFormData] = useState({ id: "", name: "" });
  const [delMode, setDelMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const token = localStorage.getItem("token");

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

  async function handleCreate() {
    if (formData.name === "") {
      setErrorMsg("Name cannot be empty");
      return;
    }

    const url = formData.id
      ? `http://localhost:8080/api/agencies/${formData.id}`
      : "http://localhost:8080/api/agencies";

    const method = formData.id ? "PUT" : "POST";
    

    try {
      await fetchData(url, token, method, formData);
      onSuccess();
      dialogRef.current.close();
    } catch (error) {
      console.error("Error creating/updating agency:", error);
      setErrorMsg("Failed to create/update agency");
    }
  }

  async function handleDelete() {
    const url = `http://localhost:8080/api/agencies/${formData.id}`;

    try {
      await fetchData(url, token, "DELETE");
      onSuccess();
      dialogRef.current.close();
      setFormData({ id: "", name: "" });
    } catch (error) {
      console.error("Error deleting agency:", error);
      setErrorMsg(error.message);
    }
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
          {delMode ? `DELETE "${formData.name}"` : (formData.id === "" ? "Enter Agency Name" : "Edit Agency Name")}
        </h3>
        {!delMode && (
          <input
            type="text"
            name="name"
            placeholder={placeholder}
            value={formData.name}
            onChange={handleChange}
          />
        )}
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