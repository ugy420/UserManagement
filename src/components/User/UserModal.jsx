import Button from "../UI/Button";
import { useRef, useState, useEffect, useContext } from "react";
import { TokenContext } from "../TokenContext";
import { fetchData } from "../../utils/apiUtils.js";
import Input from "../UI/Input";
import Select from "../UI/Select";
import "./UserModal.css";

export default function UserModal({ openDialog, placeholder, onSuccess }) {
  const dialogRef = useRef();
  const { user } = useContext(TokenContext);
  const [agencies, setAgencies] = useState([]);
  const newErrors = {};
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    agency_id: "",
    phone_number: "",
    cid: "",
    createdBy: user ? user.id : null,
  });
  const [error, setError] = useState({});

  useEffect(() => {
    fetchAgencies();
  }, []);

  async function fetchAgencies() {
    const token = localStorage.getItem("token");
    try {
      const data = await fetchData("http://localhost:8080/api/agencies", token);
      setAgencies(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching agencies:", error);
    }
  }

  openDialog.current = (item) => {
    if (item) {
      console.log(item);
      const agency = agencies.find(
        (agency) => agency.name === item.agency_name
      );
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
        agency_id: "",
        phone_number: "",
        cid: "",
        createdBy: user ? user.id : null,
      });
    }
    dialogRef.current.showModal();
  };

  function handleCancel() {
    setFormData({
      id: "",
      username: "",
      email: "",
      agency_id: "",
      phone_number: "",
      cid: "",
      createdBy: user ? user.id : null,
    });
    setError({});
    dialogRef.current.close();
  }

  function validateForm() {

    if (!formData.username || !formData.email || !formData.agency_id || !formData.phone_number || !formData.cid) {
      newErrors.general = "Please fill the form!";
    }

    if (formData.email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address!";
      }
    }

    if (formData.phone_number) {
      const phoneRegex = /^[0-9]{8}$/;
      if (!phoneRegex.test(formData.phone_number)) {
      newErrors.phone_number = "Phone number must be exactly 8 digits long!";
      }
    }

    if (formData.cid) {
      const cidRegex = /^[0-9]{11}$/;
      if (!cidRegex.test(formData.cid)) {
      newErrors.cid = "CID must be exactly 11 digits long!";
      }
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleCreate() {
    if (!validateForm()) {
      return;
    }

    const url = formData.id
      ? `http://localhost:8080/api/users/${formData.id}`
      : "http://localhost:8080/api/users";

    const method = formData.id ? "PUT" : "POST";
    const token = localStorage.getItem("token");

    try {
      await fetchData(url, token, method, formData);
      onSuccess();
      dialogRef.current.close();
    } catch (error) {
      setError({ general: error.message });
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setError({ });
  }

  return (
    <dialog ref={dialogRef} className="form-div-modal">
      <div className="form-head">
        <h3>{formData.id === "" ? "Add New User" : "Edit User Details"}</h3>
      </div>
      <div className="div-space">
        <Input
          type="text"
          label="Username:"
          name="username"
          placeholder={placeholder.username || "Enter username"}
          value={formData.username}
          onChange={handleChange}
          className={error.username ? "error-input" : ""}
        />
        <Input
          label="CID:"
          type="text"
          name="cid"
          placeholder="Enter CID"
          value={formData.cid}
          onChange={handleChange}
          className={error.cid ? "error-input" : ""}
        />
      </div>
      <div className="div-space">
        <Input
          label="Email:"
          type="email"
          name="email"
          placeholder={placeholder.email || "Enter email"}
          value={formData.email}
          onChange={handleChange}
          className={error.email ? "error-input" : ""}
        />
        <Input
          label="Phone Number:"
          type="text"
          name="phone_number"
          placeholder="Enter phone number"
          value={formData.phone_number}
          onChange={handleChange}
          className={error.phone_number ? "error-input" : ""}
        />
      </div>
      <div className="div-space">
        <Select
          label="Agency:"
          name="agency_id"
          val={formData.agency_id}
          onChange={handleChange}
          className={error.agency_id ? "error-input" : ""}
          options={[
            { value: "", label: "Select Agency" },
            ...agencies.map((agency) => ({
              value: agency.id,
              label: agency.name,
            })),
          ]}
        />
      </div>

      {Object.values(error).length > 0 ? (
        Object.values(error).map(
          (err, index) =>
            err && (
              <div key={index} className="error-message">
                {err}
              </div>
            )
        )
      ) : (
        <div className="error-message">&nbsp;</div>
      )}

      <div className="form-btns">
        <Button text="Cancel" className="delete" onClick={handleCancel} />
        <Button text="Confirm" className="confirm" onClick={handleCreate} />
      </div>
      
    </dialog>
  );
}
