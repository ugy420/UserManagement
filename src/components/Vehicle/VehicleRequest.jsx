import { useState, useEffect, useContext, useRef } from "react";
import Input from "../UI/Input.jsx";
import Select from "../UI/Select.jsx";
import Button from "../UI/Button.jsx";
import NoPermission from "../UI/NoPermission.jsx";
import { TokenContext } from "../TokenContext.jsx";
import { fetchData } from "../../utils/apiUtils.js";

export default function VehicleRequestForm({ openDialog, onSuccess }) {
  const { fetchUserPermissions, permissions, token, user } = useContext(TokenContext);
  const [formData, setFormData] = useState({
    id: "",
    userId: user.id,
    dest: "",
    date: "",
    dis: "",
    sel: "",
    pur: "",
    divId: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const options = ["-", "Yes", "No"];
  const dialogRef = useRef();

  useEffect(() => {
    fetchUserPermissions();
    const fetchAgencyId = async () => {
      try {
        const data = await fetchData(
          `http://localhost:8080/api/users/${user.id}`,
          token
        );
        setFormData((prevData) => ({ ...prevData, divId: data.agencyId }));
      } catch (error) {
        console.error("Error fetching agency ID:", error);
      }
    };

    if (user && user.id) {
      fetchAgencyId();
    }
  }, [user, token]);

  openDialog.current = (item = null) => {
    if (item) {
      setFormData({
        id: item.id,
        userId: user.id,
        dest: item.destination,
        date: new Date(item.datetime).toLocaleDateString('en-CA'),
        dis: item.distance,
        sel: item.selfdrive === "Yes" ? "Yes" : item.selfdrive === "No" ? "No" : "-", 
        pur: item.purpose,
        divId: item.agency,
      });
      setIsEditing(true);
    } else {
      setFormData({
        id: "",
        userId: user.id,
        dest: "",
        date: "",
        dis: "",
        sel: "-",
        pur: "",
        divId: formData.divId,
      });
      setIsEditing(false);
    }
    dialogRef.current.showModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/api/vehicles/request${isEditing ? `/${formData.id}` : ""}`;
    const method = isEditing ? "PUT" : "POST";

    try {
      console.log(formData);
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? "update" : "create"} vehicle request`);
      }

      setFormData({
        userId: user.id,
        dest: "",
        date: "",
        dis: "",
        sel: "-",
        pur: "",
        divId: formData.divId, 
      });
      setErrorMsg("");
      dialogRef.current.close();
      onSuccess();
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      userId: user.id,
      dest: "",
      date: "",
      dis: "",
      sel: "-",
      pur: "",
      divId: formData.divId, 
    });
    setErrorMsg("");
    dialogRef.current.close();
  };

  const hasPermission = (permission) => {
    return permissions.some((perm) => perm.name === permission);
  };

  if (!hasPermission("Request Vehicle")) {
    return <NoPermission />;
  }

  return (
    <dialog ref={dialogRef} className="form-div-modal">
      <div className="form-head">
        <h3>Please enter your details</h3>
      </div>
      <div className="div-space">
        <Input
          label="Destination:"
          name="dest"
          placeholder="Destination"
          value={formData.dest}
          onChange={handleChange}
        />
        <Input
          label="Date:"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <div className="div-space">
        <Input
          label="Distance:"
          name="dis"
          placeholder="estimate to and from"
          value={formData.dis}
          onChange={handleChange}
        />
        <Select
          label="Self-drive:"
          options={options.map((option) => ({
            value: option,
            label: option,
          }))}
          name="sel"
          val={formData.sel}
          onChange={handleChange}
        />
      </div>
      <Input
        label="Purpose:"
        name="pur"
        placeholder="Reason for visit"
        textarea
        value={formData.pur}
        onChange={handleChange}
      />
      <div className="form-btns">
        <Button text="Cancel" className="cancel" onClick={handleCancel} />
        <Button text="Submit" className="edit" onClick={handleSubmit} />
      </div>
      {errorMsg && <p className="error">{errorMsg}</p>}
    </dialog>
  );
}