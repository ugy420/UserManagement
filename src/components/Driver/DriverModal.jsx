import Button from "../UI/Button";
import { useRef, useState } from "react";
import { fetchData } from "../../utils/apiUtils.js";
import Input from "../UI/Input";

export default function DriverCreate({ openDialog, placeholder, onSuccess }) {
  const dialogRef = useRef();
  const [formData, setFormData] = useState({ id: "", name: "", phone: "" });
  const [delMode, setDelMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const token = localStorage.getItem("token");

  openDialog.current = (item, doDelete = false) => {
    setDelMode(doDelete);
    if (item) {
      setFormData(item);
    } else {
      setFormData({ id: "", name: "", phone: "" });
    }
    dialogRef.current.showModal();
  };

  function handleCancel() {
    setErrorMsg("");
    dialogRef.current.close();
  }

  async function handleCreate() {
    if (formData.name === "" || formData.phone === "") {
      setErrorMsg("Name and phone cannot be empty");
      return;
    }

    const phoneRegex = /^[0-9]{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      setErrorMsg("Phone number must be exactly 8 digits long");
      return;
    }

    const url = formData.id
      ? `http://localhost:8080/api/drivers/${formData.id}`
      : "http://localhost:8080/api/drivers";

    const method = formData.id ? "PUT" : "POST";

    try {
      await fetchData(url, token, method, formData);
      onSuccess();
      dialogRef.current.close();
    } catch (error) {
      console.error("Error creating/updating driver:", error);
      setErrorMsg("Failed to create/update driver");
    }
  }

  async function handleDelete() {
    const url = `http://localhost:8080/api/drivers/${formData.id}`;

    try {
      await fetchData(url, token, "DELETE");
      onSuccess();
      dialogRef.current.close();
      setFormData({ id: "", name: "", phone: "" });
    } catch (error) {
      console.error("Error deleting driver:", error);
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
        <h3>
          {delMode ? `DELETE "${formData.name}"` : (formData.id === "" ? "Enter Driver Name" : "Edit Driver Name")}
        </h3>
        {!delMode && (
          <>
            <Input
              label="Name"
              type="text"
              name="name"
              placeholder={placeholder}
              value={formData.name}
              onChange={handleChange}
            />
            <Input  
              label="Phone"
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </>
        )}
          {errorMsg ? <div className="error-div">{errorMsg}</div> : <div className="error-div">&nbsp;</div>}

        <div className="form-btns">
          <Button text="Cancel" className="delete" onClick={handleCancel} />
          <Button text="Confirm" className="confirm" onClick={!delMode ? handleCreate : handleDelete} />
        </div>
    </dialog>
  );
}