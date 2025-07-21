import axios from "axios";
import { logoutHelperFunction } from "../../helper/application/logoutHelperFunction";
import { config } from "../../utils/config";

const backend_url: string = config.backend_url;

export const axiosInstanse = axios.create({
    baseURL: backend_url,
    withCredentials: true,
});

const refreshInstance = axios.create({
  baseURL: backend_url,
  withCredentials: true,
});

axiosInstanse.interceptors.request.use(
    (config) => { 
        const token = localStorage.getItem("accessToken");
  
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstanse.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original_request = error.config;

        if (error.response.status === 401 && !original_request._retry) {
            original_request._retry = true;

            try {
                const res = await refreshInstance.get("/api/v1/user/refresh-token", {
                    withCredentials: true
                });

                const newAccessToken = res.data.accessToken;

                localStorage.setItem("accessToken", newAccessToken);

                original_request.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstanse(original_request);
            } catch (err) {
                logoutHelperFunction();
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);
