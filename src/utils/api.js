import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://eticketing.waveplus.com.np/haat/api/";
const api = axios.create({
  baseURL: baseURL,
  xsrfHeaderName: "X-CSRFTOKEN",
  xsrfCookieName: "csrftoken",
});

// Function to set the access token in headers
export const setAuthHeader = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Set the initial authentication token if it exists
const accessToken = Cookies.get("access_token");
if (accessToken) {
  setAuthHeader(accessToken);
}

// Add a response interceptor to handle token refreshing
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if error is due to an expired token
    if (
      error.response.status === 401 &&
      error.response.data.code === "token_not_valid" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Mark the request as being retried

      const refreshToken = Cookies.get("refresh_token");

      try {
        // Request a new access token using the refresh token
        const refreshResponse = await axios.post(
          `${baseURL}auth/jwt/refresh2`,
          {
            refresh: refreshToken,
          }
        );

        const newAccessToken = refreshResponse.data.access;

        // Update the access token in cookies
        Cookies.set("access_token", newAccessToken);

        // Update the access token in the Axios headers
        setAuthHeader(newAccessToken);

        // Retry the original request with the new token
        return api(originalRequest);
      } catch (refreshError) {
        console.error(refreshError);
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        // Optionally redirect to login page or show an error
      }
    }
    return Promise.reject(error);
  }
);

export default api;
