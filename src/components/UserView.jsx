import { useState, useRef, useEffect, useContext } from "react";
import Button from "./UI/Button";
import UserModal from "./UserModal";
import Search from "./UI/Search.jsx";
import { TokenContext } from "./TokenContext";
import NoPermission from "./NoPermission";
import Pagination from "./UI/Pagination";

export default function UserView() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const openDialog = useRef(null);
  const { fetchUserPermissions, permissions } = useContext(TokenContext);

  useEffect(() => {
    fetchUsers();
    fetchUserPermissions();
  }, []);

  function fetchUsers() {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched users:", data); // Debugging log
        setUsers(data);
      })
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

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString(undefined);
  }

  const getCreatorName = (creatorId) => {
    console.log("Creator ID:", creatorId); // Debugging log
    const creator = users.find((user) => user.id === creatorId);
    if (creator) {
      const firstName = creator.name.split(" ")[0];
      return firstName;
    }
    return "-";
  };

  const hasPermission = (permission) => {
    return permissions.some((perm) => perm.name === permission);
  };

  if (!hasPermission("Read")) {
    return <NoPermission />;
  }

  return (
    <>
      <div className="head-div">
        <h2>Users</h2>
        Administer and oversee user accounts and privileges within the platform
      </div>
      <div className="main-div">
        <div className="table-top-div">
          <Search
            className="search"
            placeHolder="Search"
            onChange={handleChange}
          />
          {hasPermission("Create") && (
            <Button
              text="+ Add new user"
              onClick={() => openDialog.current()}
              className="create"
            />
          )}
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
            {currentItems.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.cid}</td>
                <td>{user.agency_name}</td>
                <td align="center">{getCreatorName(user.createdBy)}</td>
                <td>{formatDate(user.createdDate)}</td>
                <td>
                  <div className="button-container">
                    {hasPermission("Edit") && (
                      <Button
                        text="Edit"
                        onClick={() => handleEdit(user)}
                        className="edit"
                      />
                    )}
                    {hasPermission("Delete") && (
                      <Button
                        text="Delete"
                        onClick={() => handleDelete(user)}
                        className="delete"
                      />
                    )}
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
      <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
    </>
  );
}