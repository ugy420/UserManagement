import React from "react";
import { useNavigate } from "react-router-dom";
import "./DashCompo.css";

export default function DasCompo({ value, label, icon, link, className, nextName }) {

  const navigate = useNavigate();
  const handleMoreInfoClick = () => {
  navigate(link);
  }

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
      <button onClick={handleMoreInfoClick} className="more-info-button">
        More Info
      </button>
      </div>
    </div>
  );
}