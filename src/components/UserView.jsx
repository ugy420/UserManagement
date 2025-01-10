import { useState, useRef, useEffect } from "react";
import Button from "./Button";
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

  const styles = {
    mainDiv: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    userTableDiv: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    buttonContainer: {
      display: "flex",
      gap: "10px",
    },
    createButton: {
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      padding: "10px 20px",
      cursor: "pointer",
    },
    editButton: {
      backgroundColor: "#008CBA",
      color: "white",
      border: "none",
      padding: "5px 10px",
      cursor: "pointer",
    },
    deleteButton: {
      backgroundColor: "#f44336",
      color: "white",
      border: "none",
      padding: "5px 10px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.mainDiv}>
      <h1>User Management</h1>
      <hr />
      <div style={styles.userTableDiv}>
        <input placeholder="Search" onChange={handleChange}></input>
        <Button
          text="Create"
          onClick={() => openDialog.current()}
          style={styles.createButton}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Agency_ID</th>
            <th>Phone Number</th>
            <th>CID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <div style={styles.buttonContainer}>
                  <Button
                    text="Edit"
                    style={styles.editButton}
                    onClick={() => handleEdit(user)}
                  />
                  <Button
                    text="Delete"
                    style={styles.deleteButton}
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