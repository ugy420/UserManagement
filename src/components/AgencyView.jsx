import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import AgencyCreate from "./AgencyModal";
import Header from './Header'
export default function AgencyView() {
  const [agencies, setAgencies] = useState([]);
  const [search, setSearch] = useState("");
  const openDialog = useRef(null);

  useEffect(() => {
    fetchAgencies();
  }, []);

  function fetchAgencies() {
    fetch("http://localhost:8080/api/agencies")
      .then((res) => res.json())
      .then((data) => setAgencies(data))
      .catch((err) => console.error(err));
  }

  function handleChange(event) {
    setSearch(event.target.value);
  }

  function handleDelete(item){
    
  }

  function handleEdit(item) {
    openDialog.current(item);
  }

  const filteredAgencies = agencies.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-div">
      <Header/>
      <h1>AgencyView</h1>
      <hr />
      <div className="agency-table-div">
        <input placeholder="Search" onChange={handleChange}></input>
        <Button
          text="Create"
          onClick={() => openDialog.current()}
          className="create"
        />
      </div>
      <div className='responsive-table'>
      <table className="table">
        <thead>
          <tr>
            <th className="th">Id</th>
            <th className="th">Name</th>
            <th className="th">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAgencies.map((item) => (
            <tr key={item.id}>
              <td className="td">{item.id}</td>
              <td className="td">{item.name}</td>
              <td className="td">
                <div className="button-container">
                  <Button
                    text="Edit"
                    className="edit"
                    onClick={() => handleEdit(item)}
                  />
                  <Button text="Delete" className="delete" onClick={() => handleDelete(item)}/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <AgencyCreate openDialog={openDialog} placeholder="Agency Name" onSuccess={fetchAgencies}/>
    </div>
  );
}
