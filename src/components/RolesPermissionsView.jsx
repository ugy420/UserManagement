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

  const handleCheckboxChange = (e) => {
    setPermissions({
      ...permissions,
      [e.target.name]: e.target.checked,
    });
  };

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

export default RolesPermissionsView;
