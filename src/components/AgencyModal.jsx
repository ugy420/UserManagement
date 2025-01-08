import Button from "./Button";
import { useRef, useState } from "react";

export default function AgencyCreate({ openDialog, placeholder, onSuccess }) {
  const dialogRef = useRef();
  const [formData, setFormData] = useState({ id: "", name: "" });

  openDialog.current = (item) => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({ id: "", name: "" });
    }
    dialogRef.current.showModal();
  };

  function handleCancel() {
    dialogRef.current.close();
  }

  function handleCreate(){
    const url = formData.id
      ? `http://localhost:8080/api/agencies/${formData.id}`
      : "http://localhost:8080/api/agencies";

    const method = formData.id ? "PUT" : "POST";

    fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        onSuccess();
        dialogRef.current.close();
    })
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <dialog ref={dialogRef} className="agency-dialog">
      <div className="agency-modal">
        <h3 id="agency-title">
          {formData.id === "" ? "Enter Agency Name" : "Edit Agency Name"}
        </h3>
        {formData.id && (
          <input type="text" name="id" value={formData.id} readOnly />
        )}
        <input
          type="text"
          name="name"
          placeholder={placeholder}
          value={formData.name}
          onChange={handleChange}
        />
        <div className="agency-buttons">
          <Button text="Cancel" className="delete" onClick={handleCancel} />
          <Button text="Confirm" className="confirm" onClick={handleCreate} />
        </div>
      </div>
    </dialog>
  );
}
