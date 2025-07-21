

import { logoutHelperFunction } from "../../helper/application/logoutHelperFunction";
import axiosIntanse from "./axiosInstance";


axiosIntanse.interceptors.request.use(
    (config) {
        const token = localStorage.getItem("accessToken");

        if (token) {

            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
);



axiosIntanse.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original_request = error.config;

        if (error.response.status === 401 && !original_request._retry) {
            original_request._retry = true;

            try {
                const res = await axiosIntanse.get('/refresh-token');

                const newAccessToken = res.data.accessToken;

                localStorage.setItem("accessToken", newAccessToken);

                original_request.headers.Authorization = `Bearer ${newAccessToken}`
                return axiosIntanse(original_request)
            } catch (err) {
                logoutHelperFunction();
                return Promise.reject(error);
            }
        }
        return Promise.reject(error)
    }
)