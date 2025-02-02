import React from "react";
import { useNavigate } from "react-router-dom";

export default function DasCompo({ value, label, icon, className, nextName, link }) {
  const navigate = useNavigate();

  const handleMoreInfoClick = () => {
    navigate(link);
  };

  return (
    <div className={`dashboard-compo ${className}`}>
      <div className="dashboard-compo-icon">
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="dashboard-compo-info">
        <h3>{value}</h3>
        <p>{label}</p>
        <button onClick={handleMoreInfoClick} className="more-info-button">
          More Info
        </button>
      </div>
    </div>
  );
}