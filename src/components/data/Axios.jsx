import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const config = {
  baseURL: baseURL,
};
const api = axios.create(config);

const handleBefore = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // Loại bỏ dấu ngoặc kép nếu có
    const cleanToken = token.replace(/^"|"$/g, '');
    config.headers["Authorization"] = `Bearer ${cleanToken}`;
  }
  return config;
};

// Thêm interceptor để xử lý lỗi
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Xử lý lỗi 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      // Xóa token không hợp lệ
      localStorage.removeItem('token');
      // Có thể chuyển hướng về trang login
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use(handleBefore);

export default api;
