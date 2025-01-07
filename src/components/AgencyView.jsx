import { useState, useRef } from 'react';
import Button from './Button';
import AgencyCreate from './AgencyModal';

const agency = [
    { id: 1, name: "Agency 1" },
    { id: 2, name: "Agency 2" },
    { id: 3, name: "Agency 3" }
];

export default function AgencyView() {
    const [search, setSearch] = useState("");
    const [toEdit, setToEdit] = useState(null);
    const openDialog = useRef(null);

    function handleChange(event) {
        setSearch(event.target.value);
    }

    function handleEdit(item) {
        setToEdit(item);
        openDialog.current(item);
    }

    const filteredAgencies = agency.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="main-div">
            <h1>AgencyView</h1>
            <hr />
            <div className="agency-table-div">
                <input placeholder='Search' onChange={handleChange}></input>
                <Button
                    text="Create"
                    onClick={() => openDialog.current()}
                    className="create"
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAgencies.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <div className="button-container">
                                    <Button text="Edit" className="edit" onClick={() => handleEdit(item)} />
                                    <Button text="Delete" className="delete" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AgencyCreate openDialog={openDialog} placeholder="Agency Name" toEdit={toEdit} />
        </div>
    );
}