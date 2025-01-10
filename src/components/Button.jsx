export default function Button({className, text, onClick, children}){
    return (
        <button className={className} onClick={onClick}>{children}{text}</button>
    );
}