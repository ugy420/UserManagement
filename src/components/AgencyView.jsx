import { useState, useRef, useEffect, useContext } from "react";
import Button from "./UI/Button";
import AgencyCreate from "./AgencyModal";
import Search from "./UI/Search.jsx";
import { TokenContext } from "./TokenContext";
import NoPermission from "./NoPermission";
import Pagination from "./UI/Pagination";

export default function AgencyView() {
  const [agencies, setAgencies] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const openDialog = useRef(null);
  const { fetchUserPermissions, permissions } = useContext(TokenContext);

  useEffect(() => {
    fetchAgencies();
    fetchUserPermissions();
  }, []);

  function fetchAgencies() {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/agencies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch agencies");
        }
        return res.json();
      })
      .then((data) => setAgencies(data))
      .catch((err) => console.error(err));
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

  const filteredAgencies = agencies.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAgencies.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredAgencies.length / itemsPerPage);

  const hasPermission = (permission) => {
    return permissions.some((perm) => perm.name === permission);
  };

  if (!hasPermission("Read")) {
    return <NoPermission />;
  }

  return (
    <>
      <div className="head-div">
        <h2>Agency</h2>
        Administer and oversee user accounts and privileges within the platform
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
              text="+ Add new agency"
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
          <AgencyCreate
            openDialog={openDialog}
            placeholder="Agency Name"
            onSuccess={fetchAgencies}
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