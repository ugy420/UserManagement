import React from "react";
import DasCompo from "./DashCompo";
import "./Dashboard.css";
import ProfileCard from "./ProfileCard";
import {useState, useEffect} from 'react';

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
    <div className="dashboard-container">
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
        </header>
         <main className="dashboard-main">
          <DasCompo value={users.length} label="New Users" icon="fa-users" className="green" nextName='lightgreen' reff='https://www.figma.com/design/KclT8XSx6rr3eGRl6pzNjl/AdminLTE-Admin-dasboard-UI-Kit-v3-(Community)?node-id=1-5425&t=qon163pq6CXVjeOK-0' />
          <DasCompo value={agencies.length} label="New Agencies" icon="fas fa-building" reff='https://github.com/ugy420/UserManagement'/>  
          <DasCompo value={roles.length} label="Roles" icon="fa-check-circle" className='yellow' nextName='lightyellow' reff='https://chatgpt.com/c/677f82e4-593c-800c-892a-f7b33e725b50'/>
        </main>
        <div className="profile-card-holder">
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
        </div>
      </div>
    </div>
  );
}