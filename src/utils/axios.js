import axios from "axios";
import backendUrl from "../config";

const instance = axios.create({
  baseURL: backendUrl,
});

// Request interceptor (attach access token if present)
instance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (handle 401 errors and refresh token)
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      ["INVALID_TOKEN", "NO_TOKEN"].includes(
        error.response?.data?.errors?.[0]?.code
      ) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const {
          data: {
            data: { accessToken },
          },
        } = await axios.post(
          `${backendUrl}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        if (accessToken) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          sessionStorage.setItem("access_token", accessToken);
        }
        return instance(originalRequest);
      } catch (refreshError) {
        console.warn("Refresh token expired. Logging out...");
        localStorage.removeItem("auth");
        sessionStorage.removeItem("access_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
