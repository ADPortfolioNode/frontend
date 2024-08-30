import axios from 'axios';

const API_URL = 'http://localhost:5000/api/chat';

export const sendMessage = async (message) => {
    print("init js api call")
    try {
        const response = await axios.post(API_URL, { message });
        return response.data.response;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};