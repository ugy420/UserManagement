import { Link } from "react-router-dom";
import Button from "./Button";

export default function Drawer() {
  const user = "User Name";
  return (
    <div className="drawer">
      <div className="profile-div">
        <img src="vite.svg" className="img-pfp"/>
        {user}
      </div>
      <hr/>
      <ul className="drawer-list">
        <li>
          <Link to="/login" className="no-underline">
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
          <Link to="/usermanagement" className="no-underline">
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
                  <i className="fas fa-user-shield"></i> Roles
                </>
              }
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}