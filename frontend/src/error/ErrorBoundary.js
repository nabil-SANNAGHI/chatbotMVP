import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center h-screen bg-red-50">
                    <div className="text-center p-4 bg-white rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold text-red-500">Something went wrong</h1>
                        <p className="mt-2 text-gray-700">Please refresh the page or try again later.</p>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
