import { Link } from "react-router-dom";
import Button from "../UI/Button";
import "./Drawer.css";
import { TokenContext } from "../TokenContext";
import { useContext, useState } from "react";

export default function Drawer() {
  const user = useContext(TokenContext).user.name;
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showVehicleManagement, setShowVehicleManagement] = useState(false);

  const toggleUserManagement = () => setShowUserManagement(!showUserManagement);
  const toggleVehicleManagement = () => setShowVehicleManagement(!showVehicleManagement);

  return (
    <div className="drawer">
      <div className="profile-div">
        <img src="vite.svg" className="img-pfp" />
        {user || "User"}
      </div>
      <ul className="drawer-list">
        <li>
          <Link to="/dashboard" className="no-underline">
            <Button
              text={
                <>
                  <i className="fas fa-tachometer-alt"></i> Dashboard
                </>
              }
            />
          </Link>
        </li>
        <li>
          <Button
            text={
              <>
                <i className="fas fa-users"></i> User Management
              </>
            }
            onClick={toggleUserManagement}
          />
          {showUserManagement && (
            <ul className="nested-list">
              <li>
                <Link to="/user" className="no-underline">
                  <Button
                    text={
                      <>
                        <i className="fas fa-user"></i> User
                      </>
                    }
                  />
                </Link>
              </li>
              <li>
                <Link to="/permissions" className="no-underline">
                  <Button
                    text={
                      <>
                        <i className="fas fa-key"></i> Permissions
                      </>
                    }
                  />
                </Link>
              </li>
              <li>
                <Link to="/roles" className="no-underline">
                  <Button
                    text={
                      <>
                        <i className="fas fa-user-cog"></i> Roles
                      </>
                    }
                  />
                </Link>
              </li>
              <li>
                <Link to="/roles-permissions" className="no-underline">
                  <Button
                    text={
                      <>
                        <i className="fas fa-user-shield"></i> Roles-Permissions
                      </>
                    }
                  />
                </Link>
              </li>
              <li>
                <Link to="/user-roles" className="no-underline">
                  <Button
                    text={
                      <>
                        <i className="fas fa-users-cog"></i> User-Roles
                      </>
                    }
                  />
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Button
            text={
              <>
                <i className="fas fa-car"></i> Vehicle Management
              </>
            }
            onClick={toggleVehicleManagement}
          />
          {showVehicleManagement && (
            <ul className="nested-list">
              <li>
                <Link to="/vehicle" className="no-underline">
                  <Button
                    text={
                      <>
                        <i className="fas fa-car"></i> Vehicle
                      </>
                    }
                  />
                </Link>
              </li>
              <li>
                <Link to="/driver" className="no-underline">
                  <Button
                    text={
                      <>
                        <i className="fas fa-id-card"></i> Driver
                      </>
                    }
                  />
                </Link>
              </li>
              <li>
                <Link to="/vehiclereqmanage" className="no-underline">
                  <Button
                    text={
                      <>
                        <i className="fas fa-route"></i> Trip
                      </>
                    }
                  />
                </Link>
              </li>
              <li>
                <Link to="/receipt" className="no-underline">
                  <Button
                    text={
                      <>
                        <i className="fas fa-receipt"></i> Receipt
                      </>
                    }
                  />
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/agency" className="no-underline">
            <Button
              text={
                <>
                  <i className="fas fa-building"></i> Agency
                </>
              }
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}