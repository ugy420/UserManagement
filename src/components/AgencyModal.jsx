import Button from "./Button";
import { useRef, useState } from "react";

export default function AgencyCreate({ openDialog, placeholder, toEdit }) {
    const dialogRef = useRef();
    const [formData, setFormData] = useState({ id: "", name: "" });

    openDialog.current = (item) => {
        if (item) {
            setFormData(item);
        } else {
            setFormData({ id: "", name: "" });
        }
        dialogRef.current.showModal();
    }

    function handleCancel() {
        dialogRef.current.close();
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <dialog ref={dialogRef} className="agency-dialog">
            <div className="agency-modal">
                <h3 id="agency-title">{formData.id===""?"Enter Agency Name":"Edit Agency Name"}</h3>
                {formData.id && <input type="text" name="id" value={formData.id} readOnly />}
                <input type="text" name="name" placeholder={placeholder} value={formData.name} onChange={handleChange} />
                <div className="agency-buttons">
                    <Button text="Cancel" className="delete" onClick={handleCancel} />
                    <Button text="Confirm" className="confirm" />
                </div>
            </div>
        </dialog>
    );
}