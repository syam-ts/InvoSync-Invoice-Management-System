import { useFormik } from "formik";

export const signupValidation = (submitForm: any) => {
    return useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            mobile: 0,
            gender: "",
            country: "",
            state: "",
            language: "",
        },

        validate: (values) => {
            const errors: any = {};

            if (!values.firstName) {
                errors.firstName = "Firstname required";
            } else if (
                values.firstName.length > 10 ||
                values.firstName.length < 5
            ) {
                errors.firstName = "should be between 5 to 10 characters";
            }

            if (!values.lastName) {
                errors.lastName = "LastName required";
            } else if (
                values.lastName.length > 10 ||
                values.lastName.length < 5
            ) {
                errors.lastName = "should be between 5 to 10 characters";
            }

            if (!values.email) {
                errors.email = "Email is required";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = "Invalid email address";
            }

            if (!values.password) {
                errors.password = "Password is required";
            } else if (values.password.length < 6) {
                errors.password = "Must be at least 6 characters";
            } 

              if (!values.mobile) {
                errors.mobile = "Mobile number is required";
            } else if (
                values.mobile.toString().length < 9 ||
                values.mobile.toString().length > 10
            ) {
                errors.mobile = "Mobile number should be valid";
            }

            if (!values.gender) {
                errors.gender = "Gender required";
            } 


           if (!values.country) {
                errors.country = "Country required";
            } 


           if (!values.state) {
                errors.state = "state required";
            } 

           if (!values.language) {
                errors.language = "Language required";
            } 

            return errors;
        },

        onSubmit: (values) => { 
            submitForm(
                values.firstName,
                values.lastName,
                values.email, 
                values.password,
                values.mobile,
                values.gender,
                values.country,
                values.state,
                values.language
            );
        },
    });
};
