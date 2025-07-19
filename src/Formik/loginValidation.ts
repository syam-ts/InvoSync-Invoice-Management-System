import { useFormik } from "formik"; 

export const loginValidation = (submitForm: any) => {

   return useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        validate: (values) => {
            const errors: any = {};

            if (!values.email) {
                errors.email = "Email is required";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = "Invalid email address";
            }

            if (!values.password) {
                errors.password = "Password is required";
            } else if (values.password.length <= 8) {
                errors.password = "Must be at least 8 characters";
            }

            return errors;
        },

        onSubmit: (values) => {
            console.log(values);
            submitForm(values.email, values.password);
        },
    });
}