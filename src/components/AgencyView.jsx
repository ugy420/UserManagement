import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import AgencyCreate from "./AgencyModal";

export default function AgencyView() {
  const [agencies, setAgencies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const openDialog = useRef(null);

  useEffect(() => {
    fetchAgencies();
  }, []);

  function fetchAgencies() {
    setLoading(true);
    setError(null);
    fetch("http://localhost:8080/api/agencies")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch agencies");
        }
        return res.json();
      })
      .then((data) => {
        setAgencies(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
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
    <div className="main-div">
      <h1>Agency</h1>
      <hr/>
      <div className="agency-table-div">
        <Button
          text="Create"
          onClick={() => openDialog.current()}
          className="create"
        />
        <input placeholder="Search" onChange={handleChange}></input>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgencies.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
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
      )}
      <AgencyCreate
        openDialog={openDialog}
        placeholder="Agency Name"
        onSuccess={fetchAgencies}
      />
    </div>
  );
}
