import { createContext, useState, useEffect } from "react";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const fetchUserPermissions = async () => {
    if (token && user) {
      try {
        const response = await fetch(`http://localhost:8080/api/permissions/user/permissions/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const perms = await response.json();
        console.log(perms);
        setPermissions(perms);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    }
  };

  return (
    <TokenContext.Provider value={{ token, setToken, user, setUser, permissions, fetchUserPermissions }}>
      {children}
    </TokenContext.Provider>
  );
};