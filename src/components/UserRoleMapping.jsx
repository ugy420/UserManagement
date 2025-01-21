import { useState, useEffect } from "react";

export default function UserRoleMapping() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userRoles, setUserRoles] = useState({});
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchUserRoles(selectedUser);
    }
  }, [selectedUser]);

  function fetchUsers() {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }

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

  function fetchUserRoles(userId) {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/api/userroles/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const rolesMap = {};
        data.forEach((role) => {
          rolesMap[role.rid] = true;
        });
        setUserRoles(rolesMap);
      })
      .catch((err) => console.error("Error fetching user roles:", err));
  }

  function handleUserChange(event) {
    setSelectedUser(event.target.value);
  }

  function handleRoleChange(event) {
    const { id, checked } = event.target;
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/api/userroles/${selectedUser}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role: { [id]: checked } }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update user role");
        }
        setUserRoles((prevRoles) => ({
          ...prevRoles,
          [id]: checked,
        }));
      })
      .catch((err) => console.error("Error updating user role:", err));
  }

  return (
    <>
      <div className="head-div">
        <h2>User Role Mapping</h2>
        Administer and oversee user accounts and privileges within the platform
      </div>
      <div className="main-div">
        <div className="">
          User
          <select value={selectedUser} onChange={handleUserChange}>
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

  
        <div className="checkbox-div">
        Roles
          {roles.map((role) => (
            <div key={role.id}>
              <input
                type="checkbox"
                id={role.id}
                checked={userRoles[role.id] || false}
                onChange={handleRoleChange}
                disabled={!selectedUser}
              />
              <label htmlFor={role.id}>{role.name}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}