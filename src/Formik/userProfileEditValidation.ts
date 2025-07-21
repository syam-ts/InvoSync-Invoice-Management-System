import { useFormik, type FormikErrors } from "formik";
import { useSelector } from "react-redux";

export const userProfileEditValidation = (submitForm: any) => {


    const user = useSelector((state: any) => state.currentUser)

    return useFormik({
        initialValues: {
            fullName: user.fullName ,
            mobile: user.mobile,
            gender: user.gender,
            language: user.language,
            country: user.country,
            state: user.state,
        },

        validate: (values) => {
             const errors: FormikErrors<typeof values> = {};

            if (!values.fullName) {
                errors.fullName = "Full Name Required";
            } else if (values.fullName.length < 5 || values.fullName.length > 20) {
                errors.fullName = "Name should be b/w 5 to 20 charachters";
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
                errors.gender = "Gender is Required";
            }

            if (!values.language) {
                errors.language = "Language is Required";
            }

            if (!values.country) {
                errors.country = "Country is Required";
            }

            if (!values.state) {
                errors.state = "State is Required";
            }

            return errors;
        },

        onSubmit: (values) => {
            console.log(values);
            submitForm(
                values.fullName,
                values.mobile,
                values.gender,
                values.language,
                values.country,
                values.state
            );
        },
    });
};
