import { useFormik } from "formik";
import type { IClients } from "../helper/interfaces/IClient";

const initialValues: IClients = {
    companyName: "",
    currency: "",
    email: "",
    phone: 0,
    panNumber: "",
};

export const addNewClientValidation = (submitForm: any) => {
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

            if (!values.currency) {
                errors.currency = "Currency is required";
            }

            if (!values.email) {
                errors.email = "Email is required";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = "Invalid email address";
            }

            if (!values.phone) {
                errors.phone = "Phone number is required";
            } else if (
                values.phone.toString().length < 9 ||
                values.phone.toString().length > 10
            ) {
                errors.phone = "Phone number should be valid (10 digits)";
            }

            if (!values.panNumber) {
                errors.panNumber = "Pan number number is required";
            } else if (values.panNumber.length < 9 || values.panNumber.length > 10) {
                errors.panNumber = "Pan number number should be valid (10 digits)";
            }

            return errors;
        },

        onSubmit: (values) => {
            console.log(values);
            submitForm(
                values.companyName,
                values.currency,
                values.email,
                values.phone,
                values.panNumber
            );
        },
    });
};
