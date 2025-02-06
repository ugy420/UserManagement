import { useState, useEffect, useContext, useRef } from "react";
import Input from "../UI/Input.jsx";
import Select from "../UI/Select.jsx";
import Button from "../UI/Button.jsx";
import { TokenContext } from "../TokenContext.jsx";
import { fetchData } from "../../utils/apiUtils.js";

export default function VehicleRequestAssign({ openDialog, onSuccess }) {
  const { token } = useContext(TokenContext);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    driverId: "",
    vehicleId: "",
  });
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const dialogRef = useRef();

  useEffect(() => {
    const fetchDriversAndVehicles = async () => {
      try {
        const driversData = await fetchData(
          "http://localhost:8080/api/drivers",
          token
        );
        const vehiclesData = await fetchData(
          "http://localhost:8080/api/vehicles",
          token
        );
        setDrivers(driversData);
        setVehicles(vehiclesData);
      } catch (error) {
        console.error("Error fetching drivers or vehicles:", error);
      }
    };

    fetchDriversAndVehicles();
  }, [token]);

  openDialog.current = (item) => {
    setFormData({
      name: item.name,
      date: item.datetime,
      driverId: "",
      vehicleId: "",
    });
    dialogRef.current.showModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/api/vehicles/request/${formData.id}/assign`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to assign driver and vehicle");
      }

      onSuccess();
      setErrorMsg("");
      dialogRef.current.close();
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const handleCancel = () => {
    dialogRef.current.close();
  };

  return (
    <dialog ref={dialogRef} className="form-div-modal">
      <form onSubmit={handleSubmit}>
        <div className="form-head">
          <h3>Request Details</h3>
        </div>
        <div className="div-space">
          <Input label="Name:" name="name" value={formData.name} readOnly />
        </div>
        <div className="div-space">
          <Input
            label="Date:"
            type="date"
            name="date"
            value={formData.date}
            readOnly
          />
        </div>
        <div className="div-space">
          <Select
            label="Driver:"
            name="driverId"
            options={drivers.map((driver) => driver.name)}
            value={formData.driverId}
            onChange={handleChange}
          />
          <Select
            label="Vehicle:"
            name="vehicleId"
            options={vehicles.map((vehicle) => vehicle.number)}
            value={formData.vehicleId}
            onChange={handleChange}
          />
        </div>
        {errorMsg && <p className="error">{errorMsg || ''}</p>}
        <div className="form-btns">
          <Button text="Cancel" className="cancel" onClick={handleCancel} />
          <Button text="Assign" className="edit" />
        </div>
      </form>
    </dialog>
  );
}
