import Input from '../UI/Input.jsx';
import Select from '../UI/Select.jsx';

export default function VehicleReq(){
    const options = ["-", "Yes", "No"];
    return (
        <form>
            <div className="head-div">
                <h2>Vehicle Request Form</h2>
                Request a Vehicle!
            </div>
            <div className="main-div">
                <div className='div-space'>
                    <Input label="Destination:"  name="dest" placeholder="Destination"/>
                    <Input label="Distance:" name="dis" placeholder="estimate to and from"/>
                </div>
                <div className='div-space'>
                <Input label="Date:" type="date" name="date"/>
                <Select label="Self-drive:" options={options} name="sel"/>
                </div>
                <Input label="Purpose:" name="pur" placeholder="Reason for visit" textarea/>
            </div>
        </form>
    );
}