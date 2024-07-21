import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.API_URL}`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve all token types
    const studentToken = localStorage.getItem("studentToken");
    const teacherToken = localStorage.getItem("teacherToken");
    const adminToken = localStorage.getItem("token");

    // Determine which token to use
    const token = studentToken || teacherToken || adminToken;

    // If a token is present, set it in the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
