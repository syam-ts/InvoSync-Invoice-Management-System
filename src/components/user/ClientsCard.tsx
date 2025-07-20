import { useState } from "react";
import {
    Building2,
    DollarSign,
    Mail,
    Phone,
    FileText,
    MoreVertical,
    Edit,
    Trash2,
    Eye, 
    CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const ClientCard = ({ clients }: any) => {
    const [showDropdown, setShowDropdown] = useState(null);

    const handleDropdownToggle = (clientId: any) => {
        setShowDropdown(showDropdown === clientId ? null : clientId);
    };

    const formatPhone = (phone: number) => {
        const phoneStr = phone.toString();
        return `+1 (${phoneStr.slice(0, 3)}) ${phoneStr.slice(
            3,
            6
        )}-${phoneStr.slice(6)}`;
    };

    return (
        <div className="min-h-screen pt-22  "> 
            <div className="relative max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {clients.map((client: any) => (
                        <div
                            key={client._id}
                            className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 group hover:bg-white/15 hover:border-white/30"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <div className="w-14 h-14 bg-gradient-to-br from-gray-600 to-slate-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                            <Building2 className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white/20 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white line-clamp-1 group-hover:text-gray-100 transition-colors leading-tight">
                                            {client.companyName}
                                        </h3>
                                        <div className="flex items-center space-x-1 mt-2">
                                            <div className="flex items-center space-x-1 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
                                                <DollarSign className="w-3 h-3 text-green-400" />
                                                <span className="text-xs text-green-400 font-semibold">
                                                    {client.currency}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <button
                                        onClick={() => handleDropdownToggle(client._id)}
                                        className="w-10 h-10 cursor-pointer bg-white/10 hover:bg-white/25 rounded-xl flex items-center justify-center transition-all duration-300 text-gray-300 hover:text-white backdrop-blur-sm border border-white/10 hover:border-white/30"
                                    >
                                        <MoreVertical className="w-5 h-5" />
                                    </button>

                                    {showDropdown === client._id && (
                                        <div className="absolute right-0 top-12 w-40 bg-gray-800/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl py-3 z-10 animate-in slide-in-from-top-2 duration-200">
                                            <button className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/15 transition-all duration-200 flex items-center space-x-3 rounded-lg mx-2">
                                                <Eye className="w-4 h-4 text-blue-400" />
                                                <span>
                                                    <Link to={`/client/${client._id}`}>View</Link>
                                                </span>
                                            </button>
                                            <button className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/15 transition-all duration-200 flex items-center space-x-3 rounded-lg mx-2">
                                                <Edit className="w-4 h-4 text-green-400" />
                                                <span>Edit</span>
                                            </button>
                                            <div className="border-t border-white/10 my-1"></div>
                                            <button className="w-full px-4 py-3 text-left text-sm text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all duration-200 flex items-center space-x-3 rounded-lg mx-2">
                                                <Trash2 className="w-4 h-4" />
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center space-x-4 p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all duration-300">
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                                        <Mail className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-400 uppercase tracking-wide font-medium ">
                                            Email
                                        </p>
                                        <p className="text-sm text-white font-medium truncate">
                                            {client.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all duration-300">
                                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                                        <Phone className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">
                                            Phone
                                        </p>
                                        <p className="text-sm text-white font-medium">
                                            {formatPhone(client.phone)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-5 border-t border-white/20">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-slate-500/20 rounded-xl flex items-center justify-center border border-slate-500/30">
                                            <FileText className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                                                Invoices
                                            </p>
                                            <p className="text-xl font-bold text-white">
                                                {client.numberOfInvoices || 0}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                                                Paid
                                            </p>
                                            <p className="text-xl font-bold text-white">
                                                {client.numberOfPaid || 0}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-gray-400 font-medium">
                                            Payment Rate
                                        </span>
                                        <span className="text-xs text-white font-semibold">
                                            {client.numberOfInvoices > 0
                                                ? Math.round(
                                                    (client.numberOfPaid / client.numberOfInvoices) *
                                                    100
                                                )
                                                : 0}
                                            %
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-700/50 rounded-full h-2 border border-white/10">
                                        <div
                                            className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-500 shadow-sm"
                                            style={{
                                                width: `${client.numberOfInvoices > 0
                                                        ? (client.numberOfPaid / client.numberOfInvoices) *
                                                        100
                                                        : 0
                                                    }%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-br from-gray-600/0 via-slate-700/0 to-gray-600/0 group-hover:from-gray-600/10 group-hover:via-slate-700/5 group-hover:to-gray-600/10 rounded-3xl transition-all duration-500 pointer-events-none"></div>

                            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-white/20"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientCard;
