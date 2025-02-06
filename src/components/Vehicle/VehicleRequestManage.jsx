import { useState, useRef, useEffect, useContext } from "react";
import Button from "../UI/Button.jsx";
import Search from "../UI/Search.jsx";
import { TokenContext } from "../TokenContext.jsx";
import NoPermission from "../UI/NoPermission.jsx";
import Pagination from "../UI/Pagination.jsx";
import { fetchData } from "../../utils/apiUtils.js";
import VehicleRequestAssign from "./VehicleRequestAssign.jsx";

export default function VehicleRequestManage() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const openDialog = useRef(null);
  const { fetchUserPermissions, permissions } = useContext(TokenContext);

  useEffect(() => {
    fetchRequests();
    fetchUserPermissions();
  }, []);

  async function fetchRequests() {
    const token = localStorage.getItem("token");
    try {
      const data = await fetchData("http://localhost:8080/api/vehicles/request", token);
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(event) {
    setSearch(event.target.value);
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const filteredRequests = requests.filter((item) =>
    item.destination.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const hasPermission = (permission) => {
    return permissions.some((perm) => perm.name === permission);
  };

  if (!hasPermission("Read")) {
    return <NoPermission />;
  }

  const handleAssign = (item) => {
    openDialog.current(item);
  };

  const handleView = (item) => {
    openDialog.current(item);
  };

  return (
    <>
      <div className="head-div">
        <h2>Vehicle Requests</h2>
        Manage vehicle requests within the platform
      </div>
      <div className="main-div">
        <div className="table-top-div">
          <Search
            className="search"
            placeHolder="Search"
            onChange={handleChange}
          ></Search>
        </div>
        <div className="responsive-table">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Destination</th>
                <th>Distance</th>
                <th>Date</th>
                <th>Self-drive</th>
                <th>Purpose</th>
                <th>Agency</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.destination}</td>
                  <td>{item.distance}</td>
                  <td>{item.datetime}</td>
                  <td>{item.selfdrive}</td>
                  <td>{item.purpose}</td>
                  <td>{item.agency}</td>
                  <td>{item.status}</td>
                  <td>
                    <div className="button-container">
                      <Button
                        text={item.status === "Pending" ? "Assign" : "View"}
                        onClick={item.status === "Pending" ? () => handleAssign(item) : () => handleView(item)}
                        className={item.status === "Pending" ? "confirm" : "edit"}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <VehicleRequestAssign
        openDialog={openDialog}
        onSuccess={fetchRequests}
      />
    </>
  );
}