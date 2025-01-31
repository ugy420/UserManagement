import React from "react";
import "./NoPermission.css";

const NoPermission = () => {
  return (
    <div className="no-permission-page">
        <i className="fas fa-lock"></i>
        <p>You do not have permission to view the content.</p>
    </div>
  );
};

export default NoPermission;