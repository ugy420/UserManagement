import React, { useState, useEffect, useContext } from "react";
import { TokenContext } from "../TokenContext";
import NoPermission from "../UI/NoPermission.jsx";

export default function RolesPermissionsView() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState({});
  const [selectedRole, setSelectedRole] = useState("");
  const { permissions: userPermissions, fetchUserPermissions } = useContext(TokenContext);

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
    fetchUserPermissions();
  }, []);

  useEffect(() => {
    if (selectedRole) {
      fetchRolePermissions(selectedRole);
    }
  }, [selectedRole]);

  function fetchRoles() {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/roles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRoles(data))
      .catch((err) => console.error("Error fetching roles:", err));
  }

  function fetchPermissions() {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/permissions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPermissions(data))
      .catch((err) => console.error("Error fetching permissions:", err));
  }

  function fetchRolePermissions(roleId) {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/api/rolepermissions/${roleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const permissionsMap = {};
        data.forEach((permission) => {
          permissionsMap[permission.pid] = true;
        });
        setRolePermissions(permissionsMap);
      })
      .catch((err) => console.error("Error fetching role permissions:", err));
  }

  function handleRoleChange(event) {
    setSelectedRole(event.target.value);
  }

  function handlePermissionChange(event) {
    const { id, checked } = event.target;
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/api/rolepermissions/${selectedRole}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ permission: { [id]: checked } }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update role permission");
        }
        setRolePermissions((prevPermissions) => ({
          ...prevPermissions,
          [id]: checked,
        }));
      })
      .catch((err) => console.error("Error updating role permission:", err));
  }

  const hasPermission = (permission) => {
    return userPermissions.some((perm) => perm.name === permission);
  };

  if (!hasPermission("Read")) {
    return <NoPermission />;
  }

  return (
    <>
      <div className="head-div">
        <h2>Role Permissions Mapping</h2>
        Administer and oversee role permissions within the platform
      </div>
      <div className="main-div">
        <div className="selector-header">
          Role
          <select className="selector" value={selectedRole} onChange={handleRoleChange}>
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div className="checkbox-header">
          Permissions
        </div>
        <div className="checkbox-div">
          {permissions.map((permission) => (
            <div key={permission.id}>
              <input
                type="checkbox"
                id={permission.id}
                checked={rolePermissions[permission.id] || false}
                onChange={handlePermissionChange}
                disabled={!selectedRole}
              />
              <label htmlFor={permission.id}>{permission.name}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}