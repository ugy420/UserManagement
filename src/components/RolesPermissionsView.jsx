import React, { useState, useEffect } from "react";
import "./RolesPermissionsView.css"; // Assuming you have a CSS file for styling

const RolesPermissionsView = () => {
  const [permissions, setPermissions] = useState({
    edit: false,
    delete: false,
  });
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch users from the backend
    fetch("http://localhost:8080/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAssignPermissions = (user) => {
    setSelectedUser(user);
    setPermissions(user.permissions || { edit: false, delete: false });
  };

  const handleConfirmPermissions = () => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/api/users/${selectedUser.id}/permissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(permissions),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Permissions updated:", data);
        setSelectedUser(null); // Close the permissions form
      })
      .catch((error) => {
        console.error("Error updating permissions:", error);
      });
  };

  return (
    <div className="roles-permissions-view">
      <div className="header roles-header">
        Roles
        <input
          type="text"
          placeholder="Search users"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>
      <div className="users-list">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-item">
            <span>{user.name}</span>
            <button onClick={() => handleAssignPermissions(user)}>
              Assign Permissions
            </button>
          </div>
        ))}
      </div>
      {selectedUser && (
        <div className="permissions-container">
          <h3>Assign Permissions to {selectedUser.name}</h3>
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
          <button onClick={handleConfirmPermissions}>Confirm</button>
        </div>
      )}
    </div>
  );
};
