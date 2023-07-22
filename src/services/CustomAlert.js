export const CustomAlert = ({ message, onClose }) => {
    return (
        <div className="alert">
            <p>{message}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
};