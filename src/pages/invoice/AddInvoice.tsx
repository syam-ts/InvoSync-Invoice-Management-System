import {
    FileText,
    Building2,
    Calendar,
    Plus,
    CreditCard,
    ArrowLeft,
    Save,
} from "lucide-react";
import { useEffect, useState } from "react";
import { UserService } from "../../services/api/userServices";
import { toastError } from "../../utils/sonner/toastError";
import type { IClients } from "../../helper/interfaces/IClient";
import { useNavigate } from "react-router-dom";
import { addNewInvoiceValidation } from "../../Formik/addInvoiceValidation";

const AddInvoice = () => {
    const [clients, setClients] = useState<IClients[]>([
        {
            _id: "",
            companyName: "",
            currency: "",
            email: "",
            phone: 0,
            panNumber: "",
        },
    ]);

    const navigate = useNavigate();

    useEffect(() => {
        try {
            const getMyClientFunction = async () => {
                const response = await UserService.getMyClients();

                if (!response.success) {
                    toastError(response.message);
                } else {
                    setClients(response.clients);
                }
            };

            getMyClientFunction();
        } catch (error) {
            console.log("ERROR: ", error);
        }
    }, []);

    const paymentGateways = [
        "Stripe",
        "PayPal",
        "Razorpay",
        "Square",
        "Bank Transfer",
        "Cash",
        "Check",
    ];

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
            addNewInvoiceValidation(submitForm);

    // const addItem = () => {
    //     setFormData(prev => ({
    //         ...prev,
    //         items: [...prev.items, { details: '', quantity: 1, rate: 0, total: 0 }]
    //     }));
    // };

    // const removeItem = (index) => {
    //     if (formData.items.length > 1) {
    //         const newItems = formData.items.filter((_, i) => i !== index);
    //         setFormData(prev => ({
    //             ...prev,
    //             items: newItems
    //         }));
    //     }
    // };

    // const calculateGrandTotal = () => {
    //     return formData.items.reduce((sum, item) => sum + (item.total || 0), 0);
    // };


    // companyName,
    //         companyId,
    //         invoiceNumber,
    //         dueDate,
    //         items,
    //         notes,
    //         patmentGateway

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-6">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center space-x-4 mb-6">
                        <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-200 text-gray-300 hover:text-white border border-white/10 hover:border-white/30">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                Create New Invoice
                            </h1>
                            <p className="text-gray-400">
                                Generate a new invoice for your client
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                    <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-white/20">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Invoice Details</h2>
                            <p className="text-gray-400 text-sm">
                                Fill in the invoice information below
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Client Company
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                        <Building2 className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <select
                                        className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300 appearance-none cursor-pointer`}
                                    >
                                        <option value="" className="bg-gray-800">
                                            Select company
                                        </option>
                                        {clients.map((company) => (
                                            <option
                                                key={company._id}
                                                value={company._id}
                                                className="bg-gray-800"
                                            >
                                                {company.companyName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Due Date
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                        <Calendar className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300  }`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white">Invoice Items</h3>
                                <button
                                    // onClick={addItem}
                                    className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Add Item</span>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                                        <div className="md:col-span-5">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Description
                                            </label>
                                            <input
                                                type="text"
                                                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300`}
                                                placeholder="Service or product description"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Qty
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300`}
                                                placeholder="1"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Rate
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300 `}
                                                placeholder="4000"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Total
                                            </label>
                                            <div className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-semibold">
                                                {4000}
                                            </div>
                                        </div>

                                        <div className="md:col-span-1">
                                            {/* {formData.items.length > 1 && (
                                                    <button
                                                        onClick={() => removeItem(index)}
                                                        className="w-full h-12 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 rounded-xl transition-all duration-200 flex items-center justify-center"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )} */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="bg-gradient-to-r from-gray-600/20 to-stone-700/20 border border-gray-500/30 rounded-2xl 
                            p-6 mt-6"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-white">
                                        Grand Total:
                                    </span>
                                    {/* <span className="text-2xl font-bold text-blue-400">${calculateGrandTotal().toFixed(2)}</span> */}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Notes (Optional)
                                </label>
                                <textarea
                                    className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300 resize-none"
                                    placeholder="Additional notes or terms..."
                                />
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-3">
                                        Payment Gateway
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                            <CreditCard className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <select
                                            className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300 appearance-none cursor-pointer`}
                                        >
                                            <option value="" className="bg-gray-800">
                                                Select payment method
                                            </option>
                                            {paymentGateways.map((gateway) => (
                                                <option
                                                    key={gateway}
                                                    value={gateway}
                                                    className="bg-gray-800"
                                                >
                                                    {gateway}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end space-x-4 pt-8 border-t border-white/20">
                            <button
                                type="button"
                                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/30"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="flex items-center space-x-2 px-10 py-3 bg-gradient-to-r
                                 from-gray-600 to-stone-700 hover:from-gray-500 hover:to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-white/20 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                <>
                                    <Save className="w-5 h-5" />
                                    <span className="font-semibold">Create Invoice</span>
                                </>
                            </button>
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-700/5 rounded-3xl pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
};

export default AddInvoice;
