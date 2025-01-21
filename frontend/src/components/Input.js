const Input = ({ value, onChange, placeholder, disabled, className }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${className}`}
            disabled={disabled}
        />
    );
};

export default Input;