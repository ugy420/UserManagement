import React from "react";
import DasCompo from "./DashCompo";
import "./Dashboard.css";
import ProfileCard from "./ProfileCard";
import {useState, useEffect} from 'react';

export default function DashboardView() {
  // fetch data from api endpoint localhost8080/api/users
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
        </header>
        <main className="dashboard-main">
        <DasCompo value="15" label="New Users" icon="fa-users" className="green" nextName='lightgreen'reff='https://www.figma.com/design/KclT8XSx6rr3eGRl6pzNjl/AdminLTE-Admin-dasboard-UI-Kit-v3-(Community)?node-id=1-5425&t=qon163pq6CXVjeOK-0' />
        <DasCompo value="5" label="New Agencies" icon="fas fa-building" reff='https://github.com/ugy420/UserManagement'/>  
        <DasCompo value="2"  label="Roles" icon="fa-check-circle" className='yellow' nextName='lightyellow' reff='https://chatgpt.com/c/677f82e4-593c-800c-892a-f7b33e725b50'/>
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