import axios from "axios";
import { config } from "../../utils/config";

export const UserService = {
    loginUser: async (email: string, password: string) => {
        try {
            const { data } = await axios.post(
                `${config.backend_url}/api/v1/user/login`,
                { email, password }
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
            const token = localStorage.getItem("token");
            const { data } = await axios.get(
                `${config.backend_url}/api/v1/user/my-clients`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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

    getAllInvoices: async (clientId: string | undefined) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(
                `${config.backend_url}/api/v1/client/all-invoices/${clientId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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

    getProfile: async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(
                `${config.backend_url}/api/v1/user/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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

    updateProfile: async (
        fullName: string,
        mobile: number,
        gender: string,
        language: string,
        country: string,
        state: string
    ) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.put(
                `${config.backend_url}/api/v1/user/update`,
                {
                    fullName,
                    mobile,
                    gender,
                    country,
                    state,
                    language,
                },
                 {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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
};
