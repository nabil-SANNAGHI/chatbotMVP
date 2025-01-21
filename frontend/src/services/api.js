import { apiRequest } from "../utils/helpers";

// api to send message to the bot
export const sendMessage = async (content) => {
    return apiRequest('post', '/message', { content });
};

// api to fetch chat history
export const fetchMessages = async () => {
    return apiRequest('get', '/message');
};

// api to fetch all responses
export const fetchResponses = async () => {
    return apiRequest('get', '/responses');
};

// api to add a new response
export const addResponse = async (data) => {
    return apiRequest('post', '/responses', data);
};

// api to update an existing response
export const updateResponse = async (id, data) => {
    return apiRequest('put', `/responses/${id}`, data);
}

// api to delete an existing response
export const deleteResponse = async (id) => {
    return apiRequest('delete', `/responses/${id}`);
}