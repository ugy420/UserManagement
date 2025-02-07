import { useState, useEffect, useContext } from "react";
import Input from "../UI/Input.jsx";
import Select from "../UI/Select.jsx";
import Button from "../UI/Button.jsx";
import { TokenContext } from "../TokenContext.jsx";
import { fetchData } from "../../utils/apiUtils.js";

export default function VehicleReq() {
  const { token, user } = useContext(TokenContext);
  const [formData, setFormData] = useState({
    userId: user.id,
    dest: "",
    date: "",
    dis: "",
    sel: "-",
    pur: "",
    divId: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const options = ["-", "Yes", "No"];

  useEffect(() => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/api/vehicles/request`;

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
        throw new Error("Failed to create vehicle request");
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
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="head-div">
        <h2>Vehicle Request Form</h2>
        Request a Vehicle!
      </div>
      <div className="main-div">
        <div className="form-div">
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
              }))
              }
              name="sel"
              value={formData.sel}
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
            <Button text="Cancel" className="cancel" />
            <Button text="Submit" className="edit" />
          </div>
          {errorMsg && <p className="error">{errorMsg}</p>}
        </div>
      </div>
    </form>
  );
}