import { AUTH_ENDPOINTS } from "@/constants/endpoints";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization:
      typeof window !== "undefined"
        ? "JWT " + localStorage.getItem("access_token")
        : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops early
    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + `${AUTH_ENDPOINTS.SIGN_IN}/refresh/`
    ) {
      window.location.href = "/sign-in";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post(
              `${process.env.NEXT_PUBLIC_APP_BASE_URL}${AUTH_ENDPOINTS.SIGN_IN}/refresh/`,
              { refresh: refreshToken }
            )
            .then((response) => {
              localStorage.setItem("access_token", response.data.access);
              localStorage.setItem("refresh_token", response.data.refresh);

              axiosInstance.defaults.headers["Authorization"] =
                "JWT " + response.data.access;
              originalRequest.headers["Authorization"] =
                "JWT " + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/sign-in";
        }
      } else {
        console.log("Refresh token not available.");
        window.location.href = "/sign-in";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;
