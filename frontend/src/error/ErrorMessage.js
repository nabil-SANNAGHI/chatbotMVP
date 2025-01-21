const ErrorMessage = ({ error, className = 'mt-2 text-red-500 text-center' }) => {
    if (!error) return null;

    return <div className={className}>{error}</div>;
};

export default ErrorMessage;