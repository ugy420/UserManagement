import { useNavigate } from "react-router-dom";
import "./DashCompo.css";

export default function DasCompo({ value, label, icon, link}) {

  const navigate = useNavigate();
  const handleMoreInfoClick = () => {
  navigate(link);
  }

  return (
    <div className={`container`} onClick={handleMoreInfoClick}>
      <div className="outer">
        <div className='inner'>
          <div>
            {label}
          </div>
          <div className="value">
            {value}
          </div>
        </div>
      </div>
      <div className="icon-div">
        <i className={`fa-solid ${icon} icon`}></i>     
      </div>
    </div>
  );
}