import React from "react";
import "./DashCompo.css";

export default function DasCompo({ value, label, icon, reff, className, nextName }) {
  return (
    <div className={`container ${className}`}>
      <div className="outer">
        <div className='inner'>
          <h1>{value}</h1>
          <div className="dashboard-content1">
            <p className="title">{label}</p>
          </div>
        </div>
        <i className={`fa-solid ${icon} icon`}></i>
      </div>

      <div className={`next-Link ${nextName}`}>
        <a href={reff} className="link">
          More Information <i className="fa-solid fa-circle-arrow-right"></i>
        </a>
      </div>
    </div>
  );
}