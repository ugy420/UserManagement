import Button from "./Button";

export default function Drawer() {
  return (
    <div className="drawer">
      Welcome, User
      <ul className="drawer-list">
        <li>
          <Button
            text={
              <>
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </>
            }
          />
        </li>
        <li>
          <Button
            text={
              <>
                <i className="fas fa-user"></i> User
              </>
            }
          />
        </li>
        <li>
          <Button
            text={
              <>
                <i className="fas fa-building"></i> Agency
              </>
            }
          />
        </li>
        <li>
          <Button
            text={
              <>
                <i className="fas fa-key"></i> Permissions
              </>
            }
          />
        </li>
        <li>
          <Button
            text={
              <>
                <i className="fas fa-user-shield"></i> Roles
              </>
            }
          />
        </li>
      </ul>
    </div>
  );
}