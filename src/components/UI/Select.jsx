import './select.css';

export default function Select({ label, options, name, onChange }) {
  return(
    <div className="input-div"> 
        <label htmlFor={name} className="input-label">
            {label}
        </label>
        <select name={name} onChange={onChange} className="select-frm" id={name}>
            {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
    );
}
