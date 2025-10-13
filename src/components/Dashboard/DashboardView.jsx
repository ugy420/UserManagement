import React, { useState, useEffect } from "react";
import DasCompo from "./DashCompo";
import "./Dashboard.css";

export default function DashboardView() {
  const [users, setUsers] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));

    fetch("http://localhost:8080/api/agencies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAgencies(data))
      .catch((err) => console.error(err));

    fetch("http://localhost:8080/api/vehicles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((err) => console.error(err));

      fetch("http://localhost:8080/api/drivers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDrivers(data))
      .catch((err) => console.error(err));
      fetch("http://localhost:8080/api/vehicles/request", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTrips(data))
      .catch((err) => console.error(err));

  }, []);
  
  

  return (
    <>
      <div>
        <header className="head-div">
          <h2>Dashboard</h2>
        </header>
        <div className="main-div">
          <main className="dashboard-main">
            <DasCompo
              value={users.length}
              label="Users"
              icon="fa-users"
              link="/user"
            />
            <DasCompo
              value={agencies.length}
              label="Agencies"
              icon="fas fa-building"
              link="/agency"
            />
            <DasCompo
              value={vehicles.length}
              label="Vehicles"
              icon="fas fa-car"
              link="/vehicle"
            />
            <DasCompo
              value={drivers.length}
              label="Drivers"
              icon="fas fa-car"
              link="/driver"
            />
            <DasCompo
              value={trips.length}
              label="Trips"
              icon="fas fa-car"
              link="/vehiclereqmanage"
            />         
          </main>
        </div>
      </div>
    </>
  );
}