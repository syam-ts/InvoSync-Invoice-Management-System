import { useFormik } from "formik";
import type { IInvoice } from "../helper/interfaces/IInvoice";

const initialValues: IInvoice = {
    companyName: "",
    companyId: "",
    dueDate: "",
    items: [
        {
            details: "",
            quantity: 0,
            rate: 0,
            total: 0,
        },
    ],
    notes: "",
    paymentGateway: "",
};

export const addNewInvoiceValidation = (submitForm: any) => {
    return useFormik({
        initialValues,
        validate: (values) => {
            const errors: any = {};

            if (!values.companyName) {
                errors.companyName = "Company name required";
            } else if (
                values.companyName.length > 30 ||
                values.companyName.length < 10
            ) {
                errors.companyName = "should be between 10 to 30 characters";
            }

            if (!values.dueDate) {
                errors.dueDate = "Due Date is required";
            }

            if (!values.items) {
                errors.itmes = "Items are required";
            }

            if (!values.details) {
                errors.details = "Details required";
            } else if (values.details.length > 30 || values.details.length < 10) {
                errors.details = "should be between 10 to 30 characters";
            }

            if (!values.quantity) {
                errors.quantity = "Quantity is required";
            } else if (values.quantity < 5 || values.quantity >= 1) {
                errors.quantity = "quantity should be b/w 1 to 5";
            }

            if (!values.rate) {
                errors.rate = "Rate is required";
            } else if (values.rate < 50000 || values.rate >= 100) {
                errors.rate = "rate should be b/w 100 to 50000";
            }

            if (!values.notes) {
                errors.notes = "Notes required";
            } else if (values.notes.length > 30 || values.notes.length < 10) {
                errors.notes = "should be between 10 to 30 characters";
            }

            if (!values.paymentGateway) {
                errors.paymentGateway = "Payment Gateway required";
            }

            return errors;
        },

        onSubmit: (values) => {
            console.log(values);
            submitForm(
                values.companyName,
                values.companyId,
                values.dueDate,
                values.items,
                values.notes,
                values.paymentGateway
            );
        },
    });
};
