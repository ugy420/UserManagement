import { useState, useEffect, useRef, useContext } from "react";
import Button from "./Button";
import PermissionModal from "./PermissionModal";
import Search from "./Search.jsx";
import { TokenContext } from "./TokenContext";
import NoPermission from "./NoPermission";

export default function PermissionView() {
  const [perms, setPerms] = useState([]);
  const [search, setSearch] = useState("");
  const openDialog = useRef(null);
  const { fetchUserPermissions, permissions } = useContext(TokenContext);

  useEffect(() => {
    fetchPermissions();
    fetchUserPermissions();
  }, []);

  function fetchPermissions() {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/permissions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch permissions");
        }
        return res.json();
      })
      .then((data) => {
        setPerms(data);
      })
      .catch((err) => {
        console.error("Error fetching permissions:", err);
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

  const filteredItems = perms.filter((item) =>
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
          {hasPermission("create") && (
            <Button
              text="+ Add new permission"
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
          <PermissionModal
            openDialog={openDialog}
            placeholder="Permission Name"
            onSuccess={fetchPermissions}
          />
        </div>
      </div>
    </>
  );
}