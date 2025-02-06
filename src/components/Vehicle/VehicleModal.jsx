import Button from "../UI/Button";
import { useRef, useState } from "react";
import { fetchData } from "../../utils/apiUtils.js";

export default function VehicleCreate({ openDialog, placeholder, onSuccess }) {
  const dialogRef = useRef();
  const [formData, setFormData] = useState({ id: "", number: "" });
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
    if (formData.number === "") {
      setErrorMsg("Number cannot be empty");
      return;
    }

    const url = formData.id
      ? `http://localhost:8080/api/vehicles/${formData.id}`
      : "http://localhost:8080/api/vehicles";

    const method = formData.id ? "PUT" : "POST";

    try {
      await fetchData(url, token, method, formData);
      onSuccess();
      dialogRef.current.close();
    } catch (error) {
      console.error("Error creating/updating vehicle:", error);
      setErrorMsg("Failed to create/update vehicle");
    }
  }

  async function handleDelete() {
    const url = `http://localhost:8080/api/vehicles/${formData.id}`;

    try {
      await fetchData(url, token, "DELETE");
      onSuccess();
      dialogRef.current.close();
      setFormData({ id: "", name: "" });
    } catch (error) {
      console.error("Error deleting vehicle:", error);
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
          {delMode ? `DELETE "${formData.number}"` : (formData.id === "" ? "Enter Vehicle Number" : "Edit Vehicle Number")}
        </h3>
        {!delMode && (
          <input
            type="text"
            name="number"
            placeholder={placeholder}
            value={formData.number}
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