import './select.css';

export default function Select({ label, options, name, val, disabled, onChange }) {
    let cssCls = "select-frm";

    if(disabled){
        cssCls += " disabled";
    }
  return(
    <div className="input-div"> 
        <label htmlFor={name} className="input-label">
            {label}
        </label>
        <select name={name} onChange={onChange} className={cssCls} id={name} value={val} disabled={disabled}>
            {options.map((option) => (
            <option key={option.value} value={option.value} className={cssCls}>{option.label}</option>
            ))}
        </select>
    </div>
    );
}
