import { useChat } from '../hooks/useChat';
import ChatHistory from './ChatHistory';
import Button from './Button';
import Input from './Input';
import ScrollableContainer from './ScrollableContainer';
import ErrorMessage from '../error/ErrorMessage';

const Chat = () => {

    // Import the custom hook
    const {
        message,
        setMessage,
        chatHistory,
        isLoading,
        error,
        handleSend,
    } = useChat();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center text-gray-800">Chatbot</h1>

                {/* Chat history */}
                <ScrollableContainer className="mt-4 p-4 border border-gray-200 rounded-lg h-80 bg-gray-50">
                    <ChatHistory history={chatHistory} isLoading={isLoading} />
                </ScrollableContainer>

                {/* Error message */}
                <ErrorMessage error={error} />

                {/* Chat input */}
                <form onSubmit={handleSend} className="mt-4 flex items-center gap-2">
                    <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        disabled={isLoading}
                        className="flex-1 h-12"
                    />
                    <Button
                        isLoading={isLoading}
                        disabled={isLoading}
                        className="w-24 h-12"
                    >
                        Send
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Chat;