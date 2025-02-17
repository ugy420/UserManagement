import { useState, useRef, useEffect, useContext } from "react";
import Button from "../UI/Button.jsx";
import Search from "../UI/Search.jsx";
import { TokenContext } from "../TokenContext.jsx";
import NoPermission from "../UI/NoPermission.jsx";
import Pagination from "../UI/Pagination.jsx";
import { fetchData } from "../../utils/apiUtils.js";
import VehicleRequestAssign from "./VehicleRequestDetails.jsx";
import VehicleRequestForm from "./VehicleRequest.jsx";

export default function VehicleRequestIndividual() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const openDialog = useRef(null);
  const openRequestFormDialog = useRef(null);
  const { fetchUserPermissions, permissions, user } = useContext(TokenContext);

  useEffect(() => {
    fetchRequests();
    fetchUserPermissions();
  }, []);

  async function fetchRequests() {
    const token = localStorage.getItem("token");
    try {
      const data = await fetchData(`http://localhost:8080/api/vehicles/request/${user.id}`, token);
      setRequests(data);
      console.log(data);
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

  if (!hasPermission("Request Vehicle")) {
    return <NoPermission />;
  }

  const handleEdit = (item) => {
    openRequestFormDialog.current(item);
  };
  
  const handleView = (item) => {
    openDialog.current(item, "view");
  };

  const handleAddRequest = () => {
    openRequestFormDialog.current();
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
          <Button
            text="Request Vehicle"
            onClick={handleAddRequest}
            className="create"
          />
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.destination}</td>
                  <td>{item.distance}</td>
                  <td>{new Date(item.datetime).toLocaleDateString()}</td>
                  <td>{item.selfdrive}</td>
                  <td>{item.purpose}</td>
                  <td>{item.agency}</td>
                  <td>{item.status}</td>
                  <td>
                    <div className="button-container">
                      <Button
                        text={item.status === "Pending" ? "Edit" : "View"}
                        onClick={item.status === "Pending" ? () => handleEdit(item) : () => handleView(item)}
                        className={item.status === "Pending" ? "edit" : "confirm"}
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
      <VehicleRequestForm
        openDialog={openRequestFormDialog}
        onSuccess={fetchRequests}
      />
    </>
  );
}