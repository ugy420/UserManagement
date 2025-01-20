import React, { useState } from "react";
import "./RolesPermissionsView.css"; // Assuming you have a CSS file for styling

const RolesPermissionsView = () => {
  const [permissions, setPermissions] = useState({
    edit: false,
    delete: false,
  });

  const handleCheckboxChange = (e) => {
    setPermissions({
      ...permissions,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className="roles-permissions-view">
      <div className="header roles-header">Roles</div>
      <div className="sub-header permissions-header">Permissions</div>
      <div className="permissions-container">
        <label>
          <input
            type="checkbox"
            name="edit"
            checked={permissions.edit}
            onChange={handleCheckboxChange}
          />
          Edit
        </label>
        <label>
          <input
            type="checkbox"
            name="delete"
            checked={permissions.delete}
            onChange={handleCheckboxChange}
          />
          Delete
        </label>
      </div>
    </div>
  );
};

export default RolesPermissionsView;
