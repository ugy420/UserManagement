import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import Header from "./Header";
import './UserView.css';
import UserModal from "./UserModal";

export default function UserView() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const openDialog = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/users", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }

  function handleChange(event) {
    setSearch(event.target.value);
  }

  function handleDelete(user) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete user ${user.name}?`
    );
    if (confirmDelete) {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:8080/api/users/${user.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => {
          if (res.ok) {
            fetchUsers();
          } else {
            console.error("Failed to delete user");
          }
        })
        .catch((err) => console.error(err));
    }
  }

  function handleEdit(user) {
    openDialog.current(user);
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mainDiv">
      <Header />
      <h1>User Management</h1>
      <hr />
      <div className="userTableDiv">
        <input
          className="searchInput"
          placeholder="Search"
          onChange={handleChange}
        />
        <Button
          text="Create"
          onClick={() => openDialog.current()}
          className="createButton"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>CID</th>
            <th>Agency</th>
            <th>Created By</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.cid}</td>
              <td>{user.agency_name}</td>
              <td>{user.createdBy??"-"}</td>
              <td>{user.createdDate}</td>
              <td>
                <div>
                  <Button
                    text="Edit"
                    onClick={() => handleEdit(user)}
                  />
                  <Button
                    text="Delete"
                    onClick={() => handleDelete(user)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserModal
        openDialog={openDialog}
        placeholder={{ username: "Username", email: "Email" }}
        onSuccess={fetchUsers}
      />
    </div>
  );
}