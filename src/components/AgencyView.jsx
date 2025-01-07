import Button from './Button.jsx';

const agency = [
    {
        "id": 1,
        "name": "Agency 1"
    },
    {
        "id": 2,
        "name": "Agency 2"
    },
    {
        "id": 3,
        "name": "Agency 3"
    }
]

export default function AgencyView({openDialog}) {
    return (
      <div className="main-div">
        <h1>AgencyView</h1>
        <hr />
        <div className="agency-table-div">
          <input placeholder='Search'></input>
          <Button
            text="Create"
            onClick={openDialog.current}
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
            {agency.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <div className="button-container">
                    <Button text="Edit" onClick className="edit" />
                    <Button text="Delete" className="delete" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}