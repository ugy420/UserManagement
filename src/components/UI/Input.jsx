import "./Input.css";

export default function Input({
  label,
  type,
  placeholder,
  name,
  value,
  textarea,
  readOnly,
  onChange,
  children
}){

  let cssCls = "input-field";

  if(readOnly){
    cssCls += " read-only";
  }
  return (
    <div className="input-div">
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
          className={cssCls}
          id={name}
        >{children}</textarea>
      ) : (
        <input
          placeholder={placeholder}
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          className={cssCls}
          id={name}
          readOnly={readOnly}
        >{children}</input>
      )}
    </div>
  );
}
