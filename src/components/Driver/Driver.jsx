import { useState, useRef, useEffect, useContext } from "react";
import Button from "../UI/Button.jsx";
import DriverCreate from "./DriverModal.jsx";
import Search from "../UI/Search.jsx";
import { TokenContext } from "../TokenContext.jsx";
import NoPermission from "../UI/NoPermission.jsx";
import Pagination from "../UI/Pagination.jsx";
import { fetchData } from "../../utils/apiUtils.js";

export default function Driver() {
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const openDialog = useRef(null);
  const { fetchUserPermissions, permissions } = useContext(TokenContext);

  useEffect(() => {
    fetchDrivers();
    fetchUserPermissions();
  }, []);

  async function fetchDrivers() {
    const token = localStorage.getItem("token");
    try {
      const data = await fetchData("http://localhost:8080/api/drivers", token);
      setDrivers(data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
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

  const filteredDrivers = drivers.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDrivers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);

  const hasPermission = (permission) => {
    return permissions.some((perm) => perm.name === permission);
  };

  if (!hasPermission("Read")) {
    return <NoPermission />;
  }

  return (
    <>
      <div className="head-div">
        <h2>Drivers</h2>
        Administer and oversee driver records within the platform
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
              text="+ Add new driver"
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
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>
                    <div className="button-container">
                      {hasPermission("Edit") && (
                        <Button
                          text={<i className="fas fa-solid fa-pen"></i>}
                          className="edit"
                          onClick={() => handleEdit(item)}
                        />
                      )}
                      {hasPermission("Delete") && (
                        <Button
                          text={<i className="fas fa-solid fa-trash"></i>}
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
          <DriverCreate
            openDialog={openDialog}
            placeholder="Driver Name"
            onSuccess={fetchDrivers}
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