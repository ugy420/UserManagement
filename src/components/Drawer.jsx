import Button from "./Button";
import "./Drawer.css";

const list = [
    {
        name: "Dashboard",
    },
    {
        name: "User",
    },
    {
        name: "Agency",
    },
    {
        name: "Permissions",
    }
];

export default function Drawer(){
    return(
        <>
            <div className="drawer">
                <div className="Header">
                    <img src="vite.svg"></img>
                    <h3>WelCome User</h3>
                </div>
            <ul>
                 {list.map((item) => {
                    return <li key={item.name}>{item.name}</li>
                 })    }
            </ul>
            </div>

        </>
    )
}