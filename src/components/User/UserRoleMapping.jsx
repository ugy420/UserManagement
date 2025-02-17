import { useState, useEffect, useContext } from "react";
import { fetchData } from "../../utils/apiUtils.js";
import { TokenContext } from "../TokenContext";
import NoPermission from "../UI/NoPermission.jsx";

export default function UserRoleMapping() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userRoles, setUserRoles] = useState({});
  const [selectedUser, setSelectedUser] = useState("");
  const token = localStorage.getItem("token");
  const {  permissions, fetchUserPermissions } = useContext(TokenContext);

  useEffect(() => {
    fetchUserPermissions();
    fetchUsers();
    fetchRoles();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchUserRoles(selectedUser);
    }
  }, [selectedUser]);

  async function fetchUsers() {
    try {
      const data = await fetchData("http://localhost:8080/api/users", token);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function fetchRoles() {
    try {
      const data = await fetchData("http://localhost:8080/api/roles", token);
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }

  async function fetchUserRoles(userId) {
    try {
      const data = await fetchData(`http://localhost:8080/api/userroles/${userId}`, token);
      const rolesMap = {};
      data.forEach((role) => {
        rolesMap[role.rid] = true;
      });
      setUserRoles(rolesMap);
    } catch (error) {
      console.error("Error fetching user roles:", error);
    }
  }

  function handleUserChange(event) {
    setSelectedUser(event.target.value);
  }

  async function handleRoleChange(event) {
    const { id, checked } = event.target;

    try {
      await fetchData(`http://localhost:8080/api/userroles/${selectedUser}`, token, "PUT", { role: { [id]: checked } });
      setUserRoles((prevRoles) => ({
        ...prevRoles,
        [id]: checked,
      }));
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  }

  function hasPermission(permission) {
    return permissions.some((perm) => perm.name === permission);
  }

  if(!hasPermission("ManageRP")) {
    return <NoPermission />;
  }

  return (
    <>
      <div className="head-div">
        <h2>User Role Mapping</h2>
        Administer and oversee user accounts and privileges within the platform
      </div>
      <div className="main-div">
        <div className="selector-header">
          User
          <select className="selector" value={selectedUser} onChange={handleUserChange}>
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="checkbox-header">
          Roles
        </div>
        <div className="checkbox-div">
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