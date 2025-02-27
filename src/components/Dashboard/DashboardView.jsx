import React, { useState, useEffect } from "react";
import DasCompo from "./DashCompo";
import "./Dashboard.css";
import ProfileCard from "../UI/ProfileCard";

export default function DashboardView() {
  const [users, setUsers] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [roles, setRoles] = useState([]);

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

    fetch("http://localhost:8080/api/roles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRoles(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div>
        <header className="head-div">
          <h2>Dashboard</h2>
          blah blah demo
        </header>
        <div className="main-div">
          <main className="dashboard-main">
            <DasCompo
              value={users.length}
              label="New Users"
              icon="fa-users"
              className="green"
              nextName="lightgreen"
              link="/user"
            />
            <DasCompo
              value={agencies.length}
              label="New Agencies"
              icon="fas fa-building"
              link="/agency"
            />
            <DasCompo
              value={roles.length}
              label="Roles"
              icon="fa-check-circle"
              className="yellow"
              nextName="lightyellow"
              link="/roles"
            />
          </main>
          {/* <div className="profile-card-holder">
            <h2>Users Details</h2>
            <div className="profile-cards">
              {users.map((user) => (
                <ProfileCard
                  key={user.id}
                  name={user.name}
                  email={user.email}
                  role={user.role}
                />
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}