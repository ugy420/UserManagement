import { Link } from "react-router-dom";
import Button from "../UI/Button";
import "./Drawer.css";
import { TokenContext } from "../TokenContext";
import { useContext, useEffect, useState } from "react";
import arrow from "../../assets/arrow-down.png";

export default function Drawer() {
  const { permissions, fetchUserPermissions} = useContext(TokenContext);
  const [showUser, setShowUser] = useState(false);
  const [showVehicleManagement, setShowVehicleManagement] = useState(false);
  const [showRolesPermissions, setShowRolesPermissions] = useState(false);
  const [showServices, setShowServices] = useState(false);

  useEffect(() => {
    fetchUserPermissions();
  })

  const toggleUser = () => setShowUser(!showUser);
  const toggleVehicleManagement = () =>
    setShowVehicleManagement(!showVehicleManagement);
  const toggleRolesPermissions = () =>
    setShowRolesPermissions(!showRolesPermissions);
  const toggleServices = () => setShowServices(!showServices);

  function hasPermission(permission) {
    return permissions.some((perm) => perm.name === permission);
  }

  return (
    <div className="drawer">
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
        {hasPermission('ManageRP')?<li>
          <Button
            className="drop-down-btns"
            text={
              <>
                <span>
                  <i className="fas fa-users"></i> User Management
                </span>
                <img
                  src={arrow}
                  alt="arrow"
                  className={`arrow ${showUser ? "rotate" : ""}`}
                />
              </>
            }
            onClick={toggleUser}
          />
          {showUser && (
            <ul>
              <li className="nested-list">
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
              <li className="nested-list">
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
        </li>:null}
        {hasPermission('ManageRP')?<li>
          <Button
            className="drop-down-btns"
            text={
              <>
                <span>
                  <i className="fas fa-user-shield"></i> Roles and Permissions
                </span>
                <img
                  src={arrow}
                  alt="arrow"
                  className={`arrow ${showRolesPermissions ? "rotate" : ""}`}
                />
              </>
            }
            onClick={toggleRolesPermissions}
          />
          {showRolesPermissions && (
            <ul>
              <li className="nested-list">
                <Link to="/roles-permissions" className="no-underline">
                  <Button
                    text={
                      <>
                        <i className="fas fa-user-shield"></i> Mapping
                      </>
                    }
                  />
                </Link>
              </li>
              <li className="nested-list">
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
              <li className="nested-list">
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
            </ul>
          )}
        </li>:null}
        {hasPermission('MTO')?<li>
          <Button
            className="drop-down-btns"
            text={
              <>
                <span>
                  <i className="fas fa-car"></i> Vehicle Management
                </span>
                <img
                  src={arrow}
                  alt="arrow"
                  className={`arrow ${showVehicleManagement ? "rotate" : ""}`}
                />
              </>
            }
            onClick={toggleVehicleManagement}
          />
          {showVehicleManagement && (
            <ul className="nested-list">
              <li className="nested-list">
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
              <li className="nested-list">
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
              <li className="nested-list">
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
            </ul>
          )}
        </li>:null}
        {hasPermission('Read')?<li>
          <Button
          className="drop-down-btns"
            text={
              <>
                <span>
                  <i className="fas fa-concierge-bell"></i> Services
                </span>
                <img
                  src={arrow}
                  alt="arrow"
                  className={`arrow ${showServices ? "rotate" : ""}`}
                />
              </>
            }
            onClick={toggleServices}
          />
          {showServices && (
            <ul className="nested-list">
              <li className="nested-list">
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
              <li className="nested-list">
                <Link to="/vehiclereq" className="no-underline">
                  <Button
                    text={
                      <>
                        <i className="fas fa-concierge-bell"></i> Request Vehicle
                      </>
                    }
                  />
                </Link>
              </li>
            </ul>
          )}
        </li>:null}
        {hasPermission('ManageRP')?<li>
          <Link to="/agency" className="no-underline">
            <Button
              text={
                <>
                  <i className="fas fa-building"></i> Agency
                </>
              }
            />
          </Link>
        </li>:null}
      </ul>
    </div>
  );
}
