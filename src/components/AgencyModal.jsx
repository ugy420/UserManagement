import Button from "./Button";
import { useRef } from "react";

export default function AgencyCreate({ openDialog, title, placeholder}){
    const dialogRef = useRef();

    openDialog.current = () => {
        dialogRef.current.showModal();
    }

    function handleCancel(){
        dialogRef.current.close();
    }
    
    return (
        <dialog ref={dialogRef} className="agency-dialog">
            <div className="agency-modal">
                <h3 id="agency-title">{title}</h3>
                <input type="text" placeholder={placeholder}/>
                <div className="agency-buttons">
                    <Button text="Cancel" className="delete" onClick={handleCancel}/> 
                    <Button text="Confirm" className="confirm"/>
                </div>
            </div>
        </dialog>
    );
}