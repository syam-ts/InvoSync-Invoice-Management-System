import axios from "axios";
import { config } from "../../utils/config";

export const ClientService = {
    addClient: async (
        companyName: string,
        currency: string,
        email: string,
        phone: number,
        panNumber: string
    ) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.post(
                `${config.backend_url}/api/v1/client/add`,
                {
                    companyName,
                    currency,
                    email,
                    phone,
                    panNumber,
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
