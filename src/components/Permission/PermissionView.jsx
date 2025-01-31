import { useState, useEffect, useRef, useContext } from "react";
import Button from "../UI/Button.jsx";
import PermissionModal from "./PermissionModal";
import Search from "../UI/Search.jsx";
import { TokenContext } from "../TokenContext.jsx";
import NoPermission from "../UI/NoPermission.jsx";
import Pagination from "../UI/Pagination.jsx";
import { fetchData } from "../../utils/apiUtils.js";

export default function PermissionView() {
  const [perms, setPerms] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const openDialog = useRef(null);
  const { fetchUserPermissions, permissions } = useContext(TokenContext);

  useEffect(() => {
    fetchPermissions();
    fetchUserPermissions();
  }, []);

  async function fetchPermissions() {
    const token = localStorage.getItem("token");
    try {
      const data = await fetchData("http://localhost:8080/api/permissions", token);
      setPerms(data);
    } catch (error) {
      console.error("Error fetching permissions:", error);
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

  const filteredItems = perms.filter((item) =>
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
        <h2>Permissions</h2>
        Administer and oversee privileges within the platform
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
              text="+ Add new permission"
              onClick={() => openDialog.current()}
              className="create"
            />
          )}
        </div>
        <div className="responsive-table">
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
          <PermissionModal
            openDialog={openDialog}
            placeholder="Permission Name"
            onSuccess={fetchPermissions}
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