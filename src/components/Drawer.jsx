import Button from "./Button";

export default function Drawer() {
  return (
    <div className="drawer">
      <img src="vite.svg" alt="Logo" />
      Welcome, User
      <ul>
        <li>
          <Button text="Dashboard" />
        </li>
        <li>
          <Button text="User" />
        </li>
        <li>
          <Button text="Agency" />
        </li>
        <li>
          <Button text="Permissions" />
        </li>
        <li>
          <Button text="Roles" />
        </li>
      </ul>
    </div>
  );
}
