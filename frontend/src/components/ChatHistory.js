const ChatHistory = ({ history, isLoading }) => {

    // If loading, display loading message
    if (isLoading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    // If no chat history, display message
    if (history.length === 0) {
        return <div className="text-center text-gray-500">Start chatting with the chatbot!</div>;
    }
    return (
        <div>
            {
                history.map((chat, index) => (
                    <div
                        key={index}
                        className={`p-2 mb-5 rounded-lg ${chat.sender === 'user'
                            ? 'bg-gray-100 text-gray-800 text-right'
                            : ' text-gray-800 text-left'
                            }`}
                    >
                        {chat.content}
                    </div>
                ))
            }
        </div>
    );
};

export default ChatHistory;
