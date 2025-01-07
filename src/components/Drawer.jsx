import Button from "./Button";

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
                <img src="vite.svg"></img>
                Welcome, User
            <ul>
                 {list.map((item) => {
                    return <li key={item.name}>{item.name}</li>
                 })    }
            </ul>
            </div>

        </>
    )
}