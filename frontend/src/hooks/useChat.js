import { useState, useEffect } from 'react';
import { fetchMessages, sendMessage } from '../services/api';

export const useChat = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Send a message to the bot
    const handleSend = async (e) => {
        e.preventDefault();

        // Don't send empty messages
        if (!message.trim()) return;
        setIsLoading(true);
        setError(null);

        // Send the message and update the chat history
        try {
            const result = await sendMessage(message);

            // Handle errors
            if (result.error) {
                setError(result.error);
                return;
            }

            setResponse(result.response);
            setChatHistory([
                ...chatHistory,
                { sender: 'user', content: message },
                { sender: 'bot', content: result.response },
            ]);
            setMessage('');
        } catch (err) {
            console.error('Error sending message:', err);
            setError('Failed to send message. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch chat history on component mount
    useEffect(() => {
        async function getChatHistory() {
            setIsLoading(true);
            setError(null);
            try {
                const messageHistory = await fetchMessages();

                // Handle errors
                if (messageHistory.error) {
                    setError(messageHistory.error);
                    return;
                }
                // Set the chat history
                setChatHistory(messageHistory);
            } catch (err) {
                console.error('Error fetching messages:', err);
                setError('Failed to load chat history. Please refresh the page.');
            } finally {
                setIsLoading(false);
            }
        }
        getChatHistory();
    }, []);

    return {
        message,
        setMessage,
        response,
        chatHistory,
        isLoading,
        error,
        handleSend,
    };
};