import { useState } from "react";
import {
    Receipt,
    Building2,
    Calendar,
    DollarSign,
    CreditCard,
    MoreVertical,
    Download,
    Send,
    Edit,
    Trash2,
    Eye,
    Drone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { InvoiceService } from "../../services/api/invoiceService";
import { toastError } from "../../utils/sonner/toastError";
import { Toaster } from "sonner";
import type { IInvoice } from "../../helper/interfaces/IInvoice";

const InvoiceCard = ({ invoices, updatePaidFuntion }: {invoices: IInvoice, updatePaidFuntion: any}) => {
    const [showDropdown, setShowDropdown] = useState(null);
  

    const handleDropdownToggle = (invoiceId: any) => {
        setShowDropdown(showDropdown === invoiceId ? null : invoiceId);
    };

    const markAsPaidFunction = async (invoiceId: string) => {
         try {
              const response = await InvoiceService.markAsPaid(
                invoiceId
              );
        
              // console.log("response", response);
              if (!response.success) {
                toastError(response.message);
              } else {
                toastError(response.message)
                updatePaidFuntion((prev: boolean) => !prev);
                setShowDropdown(null)
               
              }
            } catch (error) {
              console.log("ERROR: ", error);
            }
    }

    return (
        <div className="min-h-screen pt-22 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-6">
            <Toaster />
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto"> 

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {invoices.map((invoice: any) => {
                        return (
                            <div
                                key={invoice.id}
                                className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-slate-700 rounded-xl flex items-center justify-center shadow-lg">
                                            <Receipt className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white group-hover:text-gray-100 transition-colors">
                                                #{invoice.invoiceNumber}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <button
                                            onClick={() => handleDropdownToggle(invoice._id)}
                                            className="w-8 h-8 bg-white/10 cursor-pointer hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-200 text-gray-300 hover:text-white"
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </button>

                                        {showDropdown === invoice._id && (
                                            <div className="absolute right-0 top-10 w-40 bg-gray-600 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl py-2 z-10">
                                                <button className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 transition-colors flex items-center space-x-2">
                                                    <Eye className="w-4 h-4" />
                                                    <Link to={`/invoice/${invoice._id}`}>
                                                    <span>View</span>
                                                    </Link>
                                                </button>
                                             
                                                <button 
                                                onClick={() => markAsPaidFunction(invoice._id)}
                                                className="w-full px-4 py-2 text-left cursor-pointer text-sm text-blue-300 hover:bg-red-500/10 transition-colors flex items-center space-x-2">
                                                    <Drone className="w-4 h-4" />
                                                    <span>Mark as Paid</span>
                                                </button>
                                             
                                                <button className="w-full px-4 py-2 text-left text-sm text-red-300 hover:bg-red-500/10 transition-colors flex items-center space-x-2">
                                                    <Trash2 className="w-4 h-4" />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                            <Building2 className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="flex gap-36 text-sm font-medium text-white">
                                                <div>
                                                    {invoice.company.name}
                                                </div>
                                                <div className="flex">
                                                 {
                                                       invoice.paid ? (
                                                        <span className="text-green-600">
                                                            Paid
                                                        </span>
                                                    ) : (
                                                        <span className="text-red-600">
                                                            Unpaid
                                                        </span>
                                                    )
                                                }
                                                 </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span className="text-xs text-gray-400">
                                                Invoice Date
                                            </span>
                                        </div>
                                        <span className="text-sm text-white line-clamp-1">
                                            {new Date(invoice.invoiceDate).toLocaleString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span className="text-xs text-gray-400">Due Date</span>
                                        </div>
                                        <span className="text-sm text-white line-clamp-1">
                                            {new Date(invoice.dueDate).toLocaleString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <CreditCard className="w-4 h-4 text-purple-400" />
                                            <span className="text-xs text-gray-400">Payment</span>
                                        </div>
                                        <span className="text-sm text-purple-400">
                                            {invoice.paymentGateway || "gPay"}
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/10">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-2">
                                            <DollarSign className="w-5 h-5 text-green-400" />
                                            <span className="text-sm text-gray-400 uppercase tracking-wide">
                                                Total
                                            </span>
                                        </div>
                                        <span className="text-xl font-bold text-green-400">
                                            {invoice.total}
                                        </span>
                                    </div>
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-r from-gray-600/0 to-slate-700/0 group-hover:from-gray-600/5 group-hover:to-slate-700/5 rounded-2xl transition-all duration-300 pointer-events-none"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default InvoiceCard;
