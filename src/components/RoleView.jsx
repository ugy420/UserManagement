import { useState, useEffect, useRef, useContext } from "react";
import Button from "./Button";
import RoleModal from "./RoleModal";
import Search from "./Search.jsx";
import { TokenContext } from "./TokenContext";
import NoPermission from "./NoPermission";

export default function RoleView() {
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");
  const openDialog = useRef(null);
  const { fetchUserPermissions, permissions } = useContext(TokenContext);

  useEffect(() => {
    fetchRoles();
    fetchUserPermissions();
  }, []);

  function fetchRoles() {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/roles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch roles");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched roles:", data);
        setRoles(data);
      })
      .catch((err) => {
        console.error("Error fetching roles:", err);
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

  const filteredItems = roles.filter((item) =>
    typeof item.name === "string" && item.name.toLowerCase().includes(search.toLowerCase())
  );

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
          {hasPermission("create") && (
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
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <div className="button-container">
                      {hasPermission("edit") && (
                        <Button
                          text="Edit"
                          className="edit"
                          onClick={() => handleEdit(item)}
                        />
                      )}
                      {hasPermission("delete") && (
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
    </>
  );
}