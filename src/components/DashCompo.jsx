import '@fortawesome/fontawesome-free/css/all.min.css';
import React from "react";
import "./DashCompo.css";

export default function DashCompo({ value, label, icon, reff }) {
  return (
    <div className='container'>
      <div className="outer">
        <div className='inner'>
          <h1>{value}</h1>
          <div className="dashboard-content1">
            <text className="title">{label}</text>
          </div>
        </div>
        <i className={`fa-solid ${icon} icon`}></i>
      </div>

      <div className="next-Link">
        <a href={reff} className="link">
          More Information <i className="fa-solid fa-circle-arrow-right"></i>
        </a>
      </div>
    </div>
  );
}
