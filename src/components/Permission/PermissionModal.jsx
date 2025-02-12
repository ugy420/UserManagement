import Button from "../UI/Button";
import { useRef, useState } from "react";
import { fetchData } from "../../utils/apiUtils.js";
import Input from "../UI/Input";

export default function PermissionModal({
  openDialog,
  placeholder,
  onSuccess,
}) {
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
      ? `http://localhost:8080/api/permissions/${formData.id}`
      : "http://localhost:8080/api/permissions";

    const method = formData.id ? "PUT" : "POST";

    try {
      await fetchData(url, token, method, formData);
      onSuccess();
      dialogRef.current.close();
    } catch (error) {
      console.error("Error creating/updating permission:", error);
      setErrorMsg("Failed to create/update permission");
    }
  }

  async function handleDelete() {
    const url = `http://localhost:8080/api/permissions/${formData.id}`;

    try {
      await fetchData(url, token, "DELETE");
      onSuccess();
      dialogRef.current.close();
      setFormData({ id: "", name: "" });
    } catch (error) {
      console.error("Error deleting permission:", error);
      setErrorMsg(error.message);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrorMsg("");
  }

  return (
    <dialog ref={dialogRef} className="form-div-modal">
      <div className="form-head">
        <h3>
          {delMode
            ? `DELETE "${formData.name}"`
            : formData.id === ""
            ? "Enter New Permission"
            : "Edit Permission"}
        </h3>
      </div>
      {!delMode && (
        <div className="div-space">
          <Input
            label="Name:"
            type="text"
            name="name"
            placeholder={placeholder}
            value={formData.name}
            onChange={handleChange}
          />
        </div>
      )}
      <div className="error-div">
        {errorMsg ? <p className="error">{errorMsg}</p> : <p></p>}
      </div>
      <div className="form-btns">
        <Button text="Cancel" className="delete" onClick={handleCancel} />
        <Button
          text="Confirm"
          className="confirm"
          onClick={!delMode ? handleCreate : handleDelete}
        />
      </div>
    </dialog>
  );
}
