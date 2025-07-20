import axios from "axios";
import { config } from "../../utils/config";

export const InvoiceService = {
    addInvoice: async (
        companyName: string,
        companyId: string,
        dueDate: string,
        items: any[],
        notes: string,
        paymentGateway: string
    ) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.post(
                `${config.backend_url}/api/v1/invoice/create`,
                {
                    companyName,
                    companyId,
                    dueDate,
                    items,
                    notes,
                    paymentGateway,
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

    viewInvoice: async (invoiceId: string | undefined) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(
                `${config.backend_url}/api/v1/invoice/view/${invoiceId}`,
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
