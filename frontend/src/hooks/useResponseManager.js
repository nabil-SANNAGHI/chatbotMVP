import { useState, useEffect } from 'react';
import { fetchResponses, addResponse, deleteResponse, updateResponse } from '../services/api';
import { keyFormatter } from '../utils/helpers';

export const useResponseManager = () => {
    const [edit, setEdit] = useState(null);
    const [responses, setResponses] = useState([]);
    const [keywords, setKeywords] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    //  Add a new response pair to the database
    const handleAddResponse = async (e) => {
        e.preventDefault();

        // Validate input
        if (!keywords.trim() || !response.trim()) {
            setError('Keywords and response cannot be empty.');
            return;
        }

        setIsLoading(true);
        setError(null);

        // Add response to the database
        try {
            const newResponse = await addResponse({ keywords: keyFormatter(keywords), response });

            // Handle errors
            if (newResponse.error) {
                setError(newResponse.error);
                return;
            }

            //  Update the responses list
            setResponses([...responses, newResponse]);
            setKeywords('');
            setResponse('');
        } catch (err) {
            console.error('Error adding response:', err);
            setError('Failed to add response. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Delete an existing response pair from the database
    const handleDeleteRespense = async (id) => {
        setIsLoading(true);
        setError(null);

        try {
            const responseData = await deleteResponse(id);
            if (responseData.error) {
                setError(responseData.error);
                return;
            }
            setResponses(responses.filter((res) => res.id !== id));
        } catch (err) {
            console.error('Error deleting response:', err);
            setError('Failed to delete response. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    // Handle Edit button of existing response
    const handleEdit = (id, keywords, response) => {
        setEdit(id);
        setKeywords(keywords);
        setResponse(response);

    }

    // Update an existing response pair in the database
    const handleUpdateResponse = async (e, id) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const responseData = await updateResponse(id, { keywords, response });

            if (responseData.error) {
                setError(responseData.error);
                return;
            }

            const updatedResponses = responses.map((res) => {
                if (res.id === id) {
                    return { ...res, keywords, response };
                }
                return res;
            });
            setResponses(updatedResponses);
        } catch (err) {
            console.error('Error updating response:', err);
            setError('Failed to update response. Please try again.');
        } finally {
            setKeywords('');
            setResponse('');
            setEdit(null);
            setIsLoading(false);
        }
    }


    // Fetch all responses from the database
    useEffect(() => {
        async function getResponses() {
            setIsLoading(true);
            setError(null);
            try {
                const fetchedResponses = await fetchResponses();
                setResponses(fetchedResponses);
            } catch (err) {
                console.error('Error fetching responses:', err);
                setError('Failed to fetch responses. Please refresh the page.');
            } finally {
                setIsLoading(false);
            }
        }
        getResponses();
    }, []);

    return {
        responses,
        keywords,
        setKeywords,
        response,
        setResponse,
        isLoading,
        error,
        edit,
        handleEdit,
        handleAddResponse,
        handleDeleteRespense,
        handleUpdateResponse
    };
};