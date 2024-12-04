import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default axiosInstance;

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  async (error) => {
    if (error.response) {
      if (error.response && error.response.status === 401) {
        try {
          const response = await axiosInstance.get("/api/auth/refresh");
          sessionStorage.setItem(
            "accessToken",
            JSON.stringify(response.data.data.accessToken)
          );
        } catch (error) {}

        // TODO :
      } else if (status === 403) {
        alert("You do not have permission to access this resource.");
      }
    }
    // Kembalikan error agar bisa ditangani oleh handler individual
    return Promise.reject(error);
  }
);
