export default function Search({className, placeHolder, onChange}) {
  return (
    <input
      className={className}
      type="text"
      placeholder={placeHolder}
      onChange={onChange}
    ></input>
  );

}