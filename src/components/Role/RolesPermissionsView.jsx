import React, { useState, useEffect, useContext } from "react";
import { TokenContext } from "../TokenContext";
import NoPermission from "../UI/NoPermission.jsx";
import { fetchData } from "../../utils/apiUtils.js";

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

  async function fetchRoles() {
    const token = localStorage.getItem("token");
    try {
      const data = await fetchData("http://localhost:8080/api/roles", token);
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }

  async function fetchPermissions() {
    const token = localStorage.getItem("token");
    try {
      const data = await fetchData("http://localhost:8080/api/permissions", token);
      setPermissions(data);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  }

  async function fetchRolePermissions(roleId) {
    const token = localStorage.getItem("token");
    try {
      const data = await fetchData(`http://localhost:8080/api/rolepermissions/${roleId}`, token);
      const permissionsMap = {};
      data.forEach((permission) => {
        permissionsMap[permission.pid] = true;
      });
      setRolePermissions(permissionsMap);
    } catch (error) {
      console.error("Error fetching role permissions:", error);
    }
  }

  function handleRoleChange(event) {
    setSelectedRole(event.target.value);
  }

  async function handlePermissionChange(event) {
    const { id, checked } = event.target;
    const token = localStorage.getItem("token");

    try {
      await fetchData(`http://localhost:8080/api/rolepermissions/${selectedRole}`, token, "PUT", { permission: { [id]: checked } });
      setRolePermissions((prevPermissions) => ({
        ...prevPermissions,
        [id]: checked,
      }));
    } catch (error) {
      console.error("Error updating role permission:", error);
    }
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