import {axiosInstanse} from "../../api/axios/axiosInstance";

export const ClientService = {
    addClient: async (
        companyName: string,
        currency: string,
        email: string,
        phone: number,
        panNumber: string
    ) => {
        try {
            const { data } = await axiosInstanse.post(`/api/v1/client/add`, {
                companyName,
                currency,
                email,
                phone,
                panNumber,
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
