import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const apiRequest = async (method, endpoint, data = null) => {
    try {
        const response = await axios({
            method,
            url: `${API_URL}${endpoint}`,
            data,
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 429) {
            throw new Error('Too many requests. Please try again later.');
        }
        if (error.response?.status === 400 || error.response?.status === 500) {
            return error.response.data;
        }
        console.error(`Error in ${method.toUpperCase()} request to ${endpoint}:`, error);
        return { error: `Unable to ${method.toUpperCase()} ${endpoint}` };
    }
};

export const keyFormatter = (key) => key.replace(/[^a-zA-Z,]/g, '')