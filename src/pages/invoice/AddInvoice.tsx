import { useEffect, useState } from "react";
import { UserService } from "../../services/api/userServices";
import { toastError } from "../../utils/sonner/toastError";
import type { IClients } from "../../helper/interfaces/IClient";
import { useNavigate } from "react-router-dom";
import { addNewInvoiceValidation } from "../../Formik/addInvoiceValidation";
import { InvoiceService } from "../../services/api/invoiceService";
import { paymentGateways } from "../../utils/constants/paymentGateways";
import {
    FileText,
    Building2,
    Calendar,
    CreditCard,
    ArrowLeft,
    Save,
    Trash2,
} from "lucide-react";

interface IItem {
    details: string;
    quantity: number;
    rate: number;
    total: number;
    detailsError?: string;
    quantityError?: string;
    rateError?: string;
}

const AddInvoice: React.FC = () => {
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
    const [items, setItems] = useState<IItem[]>([
        {
            details: "",
            quantity: 0,
            rate: 0,
            total: 0,
        },
    ]);
    const [grandTotal, setGrandTotal] = useState<number>(0);
    const [updateGrandTotal, setUpdateGrandTotal] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const getMyClientFunction = async (): Promise<void> => {
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

    useEffect(() => {
        const calculate = () => {
            return items.reduce((acc: number, curr) => {
                return acc + curr.total;
            }, 0);
        };

        setGrandTotal(calculate());
    }, [updateGrandTotal]);

    const submitForm = async (
        companyName: string,
        companyId: string,
        dueDate: string,
        notes: string,
        paymentGateway: string
    ) => {
        try {
            const response = await InvoiceService.addInvoice(
                companyName,
                companyId,
                dueDate,
                items,
                notes,
                paymentGateway
            );

            // console.log("response", response);
            if (!response.success) {
                toastError(response.message);
            } else {
                navigate("/invoices");
            }
        } catch (error) {
            console.log("ERROR: ", error);
        }
    };

    const {
        values,
        touched,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
    } = addNewInvoiceValidation(submitForm);

    const addItem = (): void => {
        const lastItem = items[items.length - 1];

        if (
            lastItem.details.trim() === "" ||
            isNaN(lastItem.quantity) ||
            lastItem.quantity <= 0 ||
            isNaN(lastItem.rate) ||
            lastItem.rate <= 0
        ) {
            toastError("Please fill all fields correctly before adding a new item.");
            return;
        }

        setItems((prev) => [
            ...prev,
            { details: "", quantity: 0, rate: 0, total: 0 },
        ]);
    };

    const removeItem = (index: number): void => {
        if (items.length === 1) {
            toastError("At least one item is required.");
            return;
        }

        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

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

                    <form className="space-y-8" onSubmit={handleSubmit}>
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
                                        name="companyId"
                                        value={values.companyId}
                                        onChange={(e) => {
                                            const selectedId = e.target.value;
                                            const selectedCompany = clients.find(
                                                (c) => c._id === selectedId
                                            );

                                            handleChange(e);

                                            if (selectedCompany) {
                                                setFieldValue(
                                                    "companyName",
                                                    selectedCompany.companyName
                                                );
                                            } else {
                                                setFieldValue("companyName", "");
                                            }
                                        }}
                                        onBlur={handleBlur}
                                        className="w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300 appearance-none cursor-pointer"
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
                                {touched.companyName && errors.companyName && (
                                    <div className="text-red-500 text-center">
                                        {errors.companyName}
                                    </div>
                                )}
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
                                        name="dueDate"
                                        onChange={handleChange}
                                        value={values.dueDate}
                                        onBlur={handleBlur}
                                        className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300  }`}
                                    />
                                </div>
                                {touched.dueDate && errors.dueDate && (
                                    <div className="text-red-500 text-center">
                                        {errors.dueDate}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={addItem}
                                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
                            >
                                + Add Item
                            </button>
                        </div>

                        <div>
                            <div className="space-y-4">
                                {items.map((item, index: number) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 border border-white/10 rounded-2xl p-6"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                                            <div className="md:col-span-5">
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Details
                                                </label>
                                                <input
                                                    type="text"
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        const newItems = [...items];
                                                        newItems[index].details = value;
                                                        setItems(newItems);

                                                        if (value.length < 10 || value.length > 30) {
                                                            newItems[index].detailsError =
                                                                "Details must be 10 to 30 characters";
                                                        } else {
                                                            newItems[index].detailsError = "";
                                                        }
                                                        setItems([...newItems]);
                                                    }}
                                                    value={items[index].details}
                                                    className="w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                                                    placeholder="Service or product description"
                                                    minLength={10}
                                                />
                                                {items[index].detailsError && (
                                                    <div className="text-xs text-red-500 mt-1">
                                                        {items[index].detailsError}
                                                    </div>
                                                )}
                                            </div>

                                            <p className="hidden">{item.details}</p>

                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Qty
                                                </label>
                                                <input
                                                    type="number"
                                                    onChange={(e) => {
                                                        const value = parseFloat(e.target.value);
                                                        const newItems = [...items];
                                                        newItems[index].quantity = value;
                                                        newItems[index].total =
                                                            value * newItems[index].rate;

                                                        if (value < 1 || value > 5) {
                                                            newItems[index].quantityError =
                                                                "Quantity must be between 1 and 5";
                                                        } else {
                                                            newItems[index].quantityError = "";
                                                        }
                                                        setItems([...newItems]);
                                                    }}
                                                    value={items[index].quantity}
                                                    className="w-full px-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                                                    placeholder="1"
                                                />
                                                {items[index].quantityError && (
                                                    <div className="text-xs text-red-500 mt-1">
                                                        {items[index].quantityError}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Rate
                                                </label>
                                                <input
                                                    type="number"
                                                    onChange={(e) => {
                                                        const value = parseFloat(e.target.value);
                                                        const newItems = [...items];
                                                        newItems[index].rate = value;

                                                        newItems[index].total =
                                                            value * newItems[index].quantity;
                                                        setUpdateGrandTotal((prev) => !prev);

                                                        if (value < 100 || value > 50000) {
                                                            newItems[index].rateError =
                                                                "Rate must be between ₹100 and ₹50,000";
                                                        } else {
                                                            newItems[index].rateError = "";
                                                        }
                                                        setItems([...newItems]);
                                                    }}
                                                    value={items[index].rate}
                                                    min="0"
                                                    step="0.01"
                                                    className="w-full px-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                                                    placeholder="4000"
                                                />
                                                {items[index].rateError && (
                                                    <div className="text-xs text-red-500 mt-1">
                                                        {items[index].rateError}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Total
                                                </label>
                                                <div className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-semibold">
                                                    <div>{items[index].total?.toFixed(2) || "0.00"}</div>
                                                </div>
                                            </div>

                                            <div className="md:col-span-1">
                                                {items.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(index)}
                                                        className="w-full h-12 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 rounded-xl transition-all duration-200 flex items-center justify-center"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div
                                className="bg-gradient-to-r from-gray-600/20 to-stone-700/20 border border-gray-500/30 rounded-2xl 
                            p-6 mt-6"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-white">
                                        Grand Total: {grandTotal}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Notes
                                </label>
                                <textarea
                                    typeof="text"
                                    name="notes"
                                    onChange={handleChange}
                                    value={values.notes}
                                    onBlur={handleBlur}
                                    className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300 resize-none"
                                    placeholder="Additional notes or terms..."
                                />
                                {touched.notes && errors.notes && (
                                    <div className="text-red-500 text-center">{errors.notes}</div>
                                )}
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
                                            name="paymentGateway"
                                            onChange={handleChange}
                                            value={values.paymentGateway}
                                            onBlur={handleBlur}
                                            className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300 appearance-none cursor-pointer`}
                                        >
                                            <option value="" className="bg-gray-800">
                                                Select payment method
                                            </option>
                                            {paymentGateways.map((gateway: string, index: number) => (
                                                <option
                                                    key={index}
                                                    value={gateway}
                                                    className="bg-gray-800"
                                                >
                                                    {gateway}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {touched.paymentGateway && errors.paymentGateway && (
                                        <div className="text-red-500 text-center">
                                            {errors.paymentGateway}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end space-x-4 pt-8 border-t border-white/20">
                            <button
                                type="submit"
                                className="flex items-center space-x-2 px-10 py-3 bg-gradient-to-r
                                 from-gray-600 to-stone-700 hover:from-gray-500 hover:to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-white/20 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                <>
                                    <Save className="w-5 h-5" />
                                    <span className="font-semibold">Create Invoice</span>
                                </>
                            </button>
                        </div>
                    </form>

                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-700/5 rounded-3xl pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
};

export default AddInvoice;
