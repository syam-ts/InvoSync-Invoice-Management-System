import {
    Building2,
    DollarSign,
    Mail,
    Phone,
    FileText,
    Check,
    ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toastError } from "../../utils/sonner/toastError";
import { ClientService } from "../../services/api/clientService";
import { addNewClientValidation } from "../../Formik/addClientValidation";

const AddClient = () => {
    const navigate = useNavigate();

    const submitForm = async (
        companyName: string,
        currency: string,
        email: string,
        phone: number,
        panNumber: string
    ) => {
        try {
            const response = await ClientService.addClient(
                companyName,
                currency,
                email,
                phone,
                panNumber
            );

            console.log("response", response);
            if (!response.success) {
                toastError(response.message);
            } else {
                alert("success");
                localStorage.setItem("token", response.token);
                // dispatch(signInUser(response.user));
                navigate("/dashboard");
            }
        } catch (error) {
            console.log("ERROR: ", error);
        }
    };

    const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
        addNewClientValidation(submitForm);

    const currencies = [
        { code: "USD", name: "US Dollar" },
        { code: "EUR", name: "Euro" },
        { code: "GBP", name: "British Pound" },
        { code: "INR", name: "Indian Rupee" },
        { code: "CAD", name: "Canadian Dollar" },
        { code: "AUD", name: "Australian Dollar" },
        { code: "JPY", name: "Japanese Yen" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center space-x-4 mb-6">
                        <Link to="/dashboard">
                            <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-200 text-gray-300 hover:text-white border border-white/10 hover:border-white/30">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                Add New Client
                            </h1>
                            <p className="text-gray-400">
                                Create a new client profile for you bussiness
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                    <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-white/20">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                Client Information
                            </h2>
                            <p className="text-gray-400 text-sm">Fill in the details below</p>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                Company Name
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <Building2 className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    name="companyName"
                                    onChange={handleChange}
                                    value={values.companyName}
                                    onBlur={handleBlur}
                                    className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-`}
                                    placeholder="Enter company name"
                                    maxLength={30   }
                                />
                            </div>
                            {touched.companyName && errors.companyName && (
                                <div className="text-red-500 text-center">
                                    {errors.companyName}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                Currency
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <DollarSign className="w-5 h-5 text-gray-400" />
                                </div>
                                <select
                                    name="currency"
                                    onChange={handleChange}
                                    value={values.currency}
                                    onBlur={handleBlur}
                                    className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300 appearance-none cursor-`}
                                >
                                    <option value="" className="bg-gray-800">
                                        Select currency
                                    </option>
                                    {currencies.map((currency) => (
                                        <option
                                            key={currency.code}
                                            value={currency.code}
                                            className="bg-gray-800"
                                        >
                                            {currency.code} - {currency.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {touched.currency && errors.currency && (
                                <div className="text-red-500 text-center">
                                    {errors.currency}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        name="email"
                                        onChange={handleChange}
                                        value={values.email}
                                        onBlur={handleBlur}
                                        className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-`}
                                        placeholder="client@company.com"
                                    />
                                </div>
                                {touched.email && errors.email && (
                                    <div className="text-red-500 text-center">{errors.email}</div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        name="phone"
                                        onChange={handleChange}
                                        value={values.phone}
                                        onBlur={handleBlur}
                                        className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300`}
                                        placeholder="(555) 123-4567"
                                        maxLength={10}
                                    />
                                </div>
                                {touched.phone && errors.phone && (
                                    <div className="text-red-500 text-center">{errors.phone}</div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                PAN Number
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <FileText className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    name="panNumber"
                                    onChange={handleChange}
                                    value={values.panNumber}
                                    onBlur={handleBlur}
                                    className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300 `}
                                    placeholder="ABCDE1234F"
                                    maxLength={10}
                                />
                            </div>
                            {touched.panNumber && errors.panNumber && (
                                <div className="text-red-500 text-center">
                                    {errors.panNumber}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-end space-x-4 pt-8 border-t border-white/20">
                            <button
                                type="button"
                                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/30"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex items-center space-x-2 px-10 py-3 bg-gradient-to-r from-gray-600 to-slate-700 hover:from-gray-500 hover:to-slate-600 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-white/20 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                <>
                                    <Check className="w-5 h-5" />
                                    <span className="font-semibold">Create Client</span>
                                </>
                            </button>
                        </div>
                    </form>

                    <div className="absolute inset-0 bg-gradient-to-br from-gray-600/5 to-slate-700/5 rounded-3xl pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
};

export default AddClient;
