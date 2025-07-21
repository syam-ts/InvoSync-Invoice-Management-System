 
import axios from "axios";
import { config } from "../../utils/config";
import { axiosInstanse } from "../../api/axios/axiosInstance";

export const UserService = {
    loginUser: async (email: string, password: string) => {
        try {
            const { data } = await axios.post(
                `${config.backend_url}/api/v1/user/login`,
                { email, password },
                {
                    withCredentials: true,
                }
            );

            return data;
        } catch (error: unknown) {
            const err = error as { response: { data: { success: boolean } } };
            if (!err.response.data.success) {
                return err.response.data;
            }
        }
    },

    signupUser: async (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        mobile: number,
        gender: string,
        country: string,
        state: string,
        language: string
    ) => {
        try {
            const { data } = await axios.post(
                `${config.backend_url}/api/v1/user/signup`,
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    mobile,
                    gender,
                    country,
                    state,
                    language,
                }
            );

            return data;
        } catch (error: unknown) {
            const err = error as { response: { data: { success: boolean } } };
            if (!err.response.data.success) {
                return err.response.data;
            }
        }
    },

    getMyClients: async () => {
        try {
            const { data } = await axiosInstanse.get(`/api/v1/user/my-clients`);

            return data;
        } catch (error: unknown) {
            const err = error as { response: { data: { success: boolean } } };
            if (!err.response.data.success) {
                return err.response.data;
            }
        }
    },

    getAllInvoices: async (clientId: string | undefined) => {
        try {
            const { data } = await axiosInstanse.get(
                `/api/v1/client/all-invoices/${clientId}`
            );

            return data;
        } catch (error: unknown) {
            const err = error as { response: { data: { success: boolean } } };
            if (!err.response.data.success) {
                return err.response.data;
            }
        }
    },

    getProfile: async () => {
        try {
            const { data } = await axiosInstanse.get(`/api/v1/user/profile`);

            return data;
        } catch (error: unknown) {
            const err = error as { response: { data: { success: boolean } } };
            if (!err.response.data.success) {
                return err.response.data;
            }
        }
    },

    updateProfile: async (
        fullName: string,
        mobile: number,
        gender: string,
        language: string,
        country: string,
        state: string
    ) => {
        try {
            const { data } = await axiosInstanse.put(`/api/v1/user/update`, {
                fullName,
                mobile,
                gender,
                country,
                state,
                language,
            });

            return data;
        } catch (error: unknown) {
            const err = error as { response: { data: { success: boolean } } };
            if (!err.response.data.success) {
                return err.response.data;
            }
        }
    },
};
