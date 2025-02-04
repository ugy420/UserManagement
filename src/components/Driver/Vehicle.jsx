import Input from "../UI/Input.jsx";
import Select from "../UI/Select.jsx";
import Button from "../UI/Button.jsx";

export default function VehicleReq() {
  const options = ["-", "Yes", "No"];

  return (
    <form>
      <div className="head-div">
        <h2>Vehicle Request Form</h2>
        Request a Vehicle!
      </div>
      <div className="main-div">
        <div className="form-div">
          <div className="form-head">
            <h3>Please enter your details</h3>
          </div>

          <div className="div-space">
            <Input label="Destination:" name="dest" placeholder="Destination" />
            <Input label="Date:" type="date" name="date" />
          </div>
          <div className="div-space">
            <Input
              label="Distance:"
              name="dis"
              placeholder="estimate to and from"
            />
            <Select label="Self-drive:" options={options} name="sel" />
          </div>
          <Input
            label="Purpose:"
            name="pur"
            placeholder="Reason for visit"
            textarea
          />
          <div className="form-btns">
            <Button text="Cancel" className="cancel" />
            <Button text="Submit" className="edit" />
          </div>
        </div>
      </div>
    </form>
  );
}
