import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import UserModal from "./UserModal";
import Search from "./Search.jsx";

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
        Authorization: `Bearer ${token}`,
      },
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
          Authorization: `Bearer ${token}`,
        },
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

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString(undefined);
  }

  return (
    <>
      <div className="head-div">
        <h2>Users</h2>
          Administer and oversee user accounts and privileges within theplatform
      </div>
      <div className="main-div">
        <div className="table-top-div">
          <Search
            className="search"
            placeHolder="Search"
            onChange={handleChange}
          />
          <Button
            text="+ Add new user"
            onClick={() => openDialog.current()}
            className="create"
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
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
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.cid}</td>
                <td>{user.agency_name}</td>
                <td align="center">{user.createdBy ?? "-"}</td>
                <td>{formatDate(user.createdDate)}</td>
                <td>
                  <div className="button-container">
                    <Button
                      text="Edit"
                      onClick={() => handleEdit(user)}
                      className="edit"
                    />
                    <Button
                      text="Delete"
                      onClick={() => handleDelete(user)}
                      className="delete"
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
    </>
  );
}
