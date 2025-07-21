import { axiosInstanse } from "../../api/axios/axiosInstance";

 

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
            const { data } = await axiosInstanse.post(`/api/v1/invoice/create`, {
                companyName,
                companyId,
                dueDate,
                items,
                notes,
                paymentGateway,
            });

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
            const { data } = await axiosInstanse.get(
                `/api/v1/invoice/view/${invoiceId}`
            );

            return data;
        } catch (error: unknown) {
            const err = error as { response: { data: { success: boolean } } };
            if (!err.response.data.success) {
                return err.response.data;
            }
        }
    },

    markAsPaid: async (invoiceId: string | undefined) => {
        try {
            const { data } = await axiosInstanse.patch(
                `/api/v1/invoice/paid/${invoiceId}`,
                {}
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
