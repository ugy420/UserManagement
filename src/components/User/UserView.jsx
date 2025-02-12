import { useState, useRef, useEffect, useContext } from "react";
import Button from "../UI/Button.jsx";
import UserModal from "./UserModal.jsx";
import Search from "../UI/Search.jsx";
import { TokenContext } from "../TokenContext.jsx";
import NoPermission from "../UI/NoPermission.jsx";
import Pagination from "../UI/Pagination.jsx";
import { fetchData } from "../../utils/apiUtils.js";

export default function UserView() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const openDialog = useRef(null);
  const { fetchUserPermissions, permissions } = useContext(TokenContext);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
    fetchUserPermissions();
  }, []);

  async function fetchUsers() {
    try {
      const data = await fetchData("http://localhost:8080/api/users", token);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  function handleChange(event) {
    setSearch(event.target.value);
  }

  function handleDelete(user) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete user ${user.name}?`
    );
    if (confirmDelete) {
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString(undefined);
  }

  const getCreatorName = (creatorId) => {
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
        <div className="table-div">
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
              <th></th>
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
                        text={<i className="fa-solid fa-pen"></i>}
                        onClick={() => handleEdit(user)}
                        className="edit"
                      />
                    )}
                    {hasPermission("Delete") && (
                      <Button
                        text={<i className="fa-solid fa-trash"></i>}
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
        </div>
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