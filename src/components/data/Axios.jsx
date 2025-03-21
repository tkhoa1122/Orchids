import axios from "axios";

const baseURL = "https://67ab0f4d65ab088ea7e87a04.mockapi.io";

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Xử lý lỗi cơ bản
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default api;

