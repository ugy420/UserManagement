import { useState, useEffect, useContext, useRef } from "react";
import Input from "../UI/Input.jsx";
import Select from "../UI/Select.jsx";
import Button from "../UI/Button.jsx";
import { TokenContext } from "../TokenContext.jsx";
import { fetchData } from "../../utils/apiUtils.js";

export default function VehicleRequestAssign({ openDialog, onSuccess }) {
  const { token } = useContext(TokenContext);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    datetime: "",
    driverId: "",
    vehicleId: "",
    agency: "",
    selfDrive: "",
    destination: "",
    distance: "",
    remarks: "",
  });
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const dialogRef = useRef();

  useEffect(() => {
    fetchDriversAndVehicles();
  }, []);

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

  openDialog.current = (item) => {
    setFormData((prevData) => ({
      ...prevData,
      id: item.id,
      name: item.name,
      datetime: new Date(item.datetime).toISOString().split("T")[0],
      driverId: item.driverId || "",
      vehicleId: item.vehicleId || "",
      agency: item.agency,
      selfDrive: item.selfdrive,
      destination: item.destination,
      distance: item.distance,
      remarks: item.remarks || "",
    }));
    dialogRef.current.showModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setFormData({
      id: "",
      name: "",
      datetime: "",
      driverId: "",
      vehicleId: "",
      agency: "",
      selfDrive: "",
      destination: "",
      distance: "",
      remarks: "",
    });
    setErrorMsg("");
    dialogRef.current.close();
  };

  async function handleAssign() {
    if (formData.vehicleId === "") {
      setErrorMsg("Please select a vehicle");
      return;
    } else if (formData.selfDrive === "No" && formData.driverId === "") {
      setErrorMsg("Please select a driver");
      return;
    }

    const payload = { ...formData };
    if (formData.selfDrive === "Yes") {
      payload.driverId = null;
    }

    try {
      await fetchData(
        `http://localhost:8080/api/vehicles/request/${formData.id}`,
        token,
        "PUT",
        payload
      );
      onSuccess();
      dialogRef.current.close();
    } catch (error) {
      console.error("Error assigning vehicle:", error);
    }
  }

  return (
    <dialog ref={dialogRef} className="form-div-modal">
      <div className="form-head">
        <h3>Request Details</h3>
      </div>
      <div className="div-space">
        <Input label="Name:" name="name" value={formData.name} readOnly></Input>
        <Input label="Agency:" name="agency" value={formData.agency} readOnly />
      </div>
      <div className="div-space">
        <Input
          label="Destination:"
          name="destination"
          value={formData.destination}
          readOnly
        />
        <Input
          label="Distance:"
          name="distance"
          value={formData.distance}
          readOnly
        />
      </div>
      <div className="div-space space-between">
        <Input
          label="Date:"
          type="date"
          name="date"
          value={formData.datetime}
          readOnly
        />
        <Input
          label="Self-drive:"
          name="selfDrive"
          value={formData.selfDrive}
          readOnly
        />
      </div>
      <div className="div-space space-between">
        <Select
          label="Vehicle:"
          name="vehicleId"
          options={[
            { value: "", label: "Select a vehicle" },
            ...vehicles.map((vehicle) => ({
              value: vehicle.id,
              label: vehicle.number,
            })),
          ]}
          value={formData.vehicleId}
          onChange={handleChange}
        />
        <Input
          label="Remarks:"
          name="remarks"
          value={formData.remarks}
          placeholder="Remarks"
          onChange={handleChange}
        ></Input>
      </div>
      <div className="div-space">
        {formData.selfDrive === "No" ? (
          <Select
            label="Driver:"
            name="driverId"
            options={[
              { value: "", label: "Select a driver" },
              ...drivers.map((driver) => ({
                value: driver.id,
                label: driver.name,
              })),
            ]}
            value={formData.driverId}
            onChange={handleChange}
          />
        ) : null}
        <div className="error-div">{errorMsg}</div>
      </div>

      <div className="form-btns">
        <Button text="Cancel" className="cancel" onClick={handleCancel} />
        <Button text="Assign" className="edit" onClick={handleAssign} />
      </div>
    </dialog>
  );
}
