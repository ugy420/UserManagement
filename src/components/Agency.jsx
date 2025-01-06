import Button from "./Button";

export default function Agency(){
    return (
        <div className="agency-div">
            <h1>Agency</h1>
            <input tyoe="text" placeholder="Agency name"/>
            <Button text="Cancel" className="Cancel"/> <Button text="Confirm" className="Confirm"/>
        </div>
    );
}