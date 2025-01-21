import Loader from './Loader';

const Button = ({ children, isLoading, disabled, onClick, className }) => {
    return (
        <button
            type="submit"
            className={`px-4 py-2 rounded-lg ${className} ${isLoading || disabled
                ? 'bg-blue-500 w-24 h-12'
                : 'bg-blue-500 text-white hover:bg-blue-600 transition w-24 h-12'
                }`}
            disabled={isLoading || disabled}
            onClick={onClick}
        >
            {isLoading ? <Loader /> : children}
        </button>
    );
};

export default Button;