import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import AgencyCreate from "./AgencyModal";
import Search from "./Search.jsx";

export default function AgencyView() {
  const [agencies, setAgencies] = useState([]);
  const [search, setSearch] = useState("");
  const openDialog = useRef(null);

  useEffect(() => {
    fetchAgencies();
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

  const filteredAgencies = agencies.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

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
          <Button
            text="+ Add new agency"
            onClick={() => openDialog.current()}
            className="create"
          />
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
              {filteredAgencies.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <div className="button-container">
                      <Button
                        text="Edit"
                        className="edit"
                        onClick={() => handleEdit(item)}
                      />
                      <Button
                        text="Delete"
                        className="delete"
                        onClick={() => handleDelete(item)}
                      />
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
    </>
  );
}
