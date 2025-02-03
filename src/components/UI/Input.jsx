import "./Input.css";

export default function Input({
  label,
  type,
  placeholder,
  name,
  textarea,
  onChange,
}){
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
          className="input-field"
          id={name}
        />
      ) : (
        <input
          placeholder={placeholder}
          type={type}
          name={name}
          onChange={onChange}
          className="input-field"
          id={name}
        />
      )}
    </div>
  );
}
