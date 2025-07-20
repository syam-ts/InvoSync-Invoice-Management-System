import { useFormik } from "formik";
import type { IInvoice } from "../helper/interfaces/IInvoice";

const initialValues: IInvoice = {
    companyName: "",
    companyId: "",
    dueDate: "",
    items: [],
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
                values.notes,
                values.paymentGateway
            );
        },
    });
};
