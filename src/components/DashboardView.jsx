import React from "react";
import DasCompo from "./DashCompo";
import "./Dashboard.css";

export default function DashboardView() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
        </header>
        <main className="dashboard-main">
        <DasCompo value="15" label="New Users" icon="fa-users" reff='https://www.figma.com/design/KclT8XSx6rr3eGRl6pzNjl/AdminLTE-Admin-dasboard-UI-Kit-v3-(Community)?node-id=1-5425&t=qon163pq6CXVjeOK-0' />
        <DasCompo value="5" label="New Agencies" icon="fas fa-building" reff='https://github.com/ugy420/UserManagement'/>  
        <DasCompo value="2" label="Roles" icon="fa-check-circle" reff='https://chatgpt.com/c/677f82e4-593c-800c-892a-f7b33e725b50'/>
        </main>
        <text>Hi</text>
      </div>
    </div>
  );
}