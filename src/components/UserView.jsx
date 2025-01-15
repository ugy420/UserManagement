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
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }

  function handleChange(event) {
    setSearch(event.target.value);
  }

  function handleDelete(user) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete user ${user.username}?`
    );
    if (confirmDelete) {
      fetch(`http://localhost:8080/api/users/${user.id}`, {
        method: "DELETE",
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
    user.username.toLowerCase().includes(search.toLowerCase())
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
      <div className="responsiveTable">
        <table className="table">
          <thead>
            <tr>
              <th className="th">Id</th>
              <th className="th">Username</th>
              <th className="th">Email</th>
              <th className="th">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="td">{user.id}</td>
                <td className="td">{user.username}</td>
                <td className="td">{user.email}</td>
                <td className="td">
                  <div className="buttonContainer">
                    <Button
                      text="Edit"
                      className="editButton"
                      onClick={() => handleEdit(user)}
                    />
                    <Button
                      text="Delete"
                      className="deleteButton"
                      onClick={() => handleDelete(user)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UserModal
        openDialog={openDialog}
        placeholder={{ username: "Username", email: "Email" }}
        onSuccess={fetchUsers}
      />
    </div>
  );
}
