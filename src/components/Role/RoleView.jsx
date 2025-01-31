import { useState, useEffect, useRef, useContext } from "react";
import Button from "../UI/Button.jsx";
import RoleModal from "./RoleModal.jsx";
import Search from "../UI/Search.jsx";
import { TokenContext } from "../TokenContext.jsx";
import NoPermission from "../UI/NoPermission.jsx";
import Pagination from "../UI/Pagination.jsx";
import { fetchData } from "../../utils/apiUtils.js";

export default function RoleView() {
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const openDialog = useRef(null);
  const { fetchUserPermissions, permissions } = useContext(TokenContext);

  useEffect(() => {
    fetchRoles();
    fetchUserPermissions();
  }, []);

  async function fetchRoles() {
    const token = localStorage.getItem("token");
    try {
      const data = await fetchData("http://localhost:8080/api/roles", token);
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }

  function handleChange(event) {
    setSearch(event.target.value);
  }

  function handleDelete(item) {
    openDialog.current(item, true);
  }

  function handleEdit(item) {
    openDialog.current(item);
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const filteredItems = roles.filter((item) =>
    typeof item.name === "string" && item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const hasPermission = (permission) => {
    return permissions.some((perm) => perm.name === permission);
  };

  if (!hasPermission("Read")) {
    return <NoPermission />;
  }

  return (
    <>
      <div className="head-div">
        <h2>Roles</h2>
        Administer and oversee roles within the platform
      </div>
      <div className="main-div">
        <div className="table-top-div">
          <Search
            className="search"
            placeHolder="Search"
            onChange={handleChange}
          ></Search>
          {hasPermission("Create") && (
            <Button
              text="+ Add new role"
              onClick={() => openDialog.current()}
              className="create"
            />
          )}
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <div className="button-container">
                      {hasPermission("Edit") && (
                        <Button
                          text="Edit"
                          className="edit"
                          onClick={() => handleEdit(item)}
                        />
                      )}
                      {hasPermission("Delete") && (
                        <Button
                          text="Delete"
                          className="delete"
                          onClick={() => handleDelete(item)}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <RoleModal
            openDialog={openDialog}
            placeholder="Role Name"
            onSuccess={fetchRoles}
          />
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}