import { useState } from "react";
import {
    Building2,
    DollarSign,
    Mail,
    Phone,
    CreditCard,
    FileText,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
} from "lucide-react";

// interface IClientCardProps {
//     id: string;
//     companyName: string;
//     currency: string;
//     email: string;
//     phone: number;
//     panNumber: string;
//     numberOfInvoices: number;
// }

const ClientCard= ({ clients }: any) => {
     
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
        <div className="min-h-screen">
            <div className="relative max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clients.map((client: any) => (
                        <div
                            key={client._id}
                            className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-slate-700 rounded-xl flex items-center justify-center shadow-lg">
                                        <Building2 className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white group-hover:text-gray-100 transition-colors">
                                            {client.companyName}
                                        </h3>
                                        <div className="flex items-center space-x-1 mt-1">
                                            <DollarSign className="w-4 h-4 text-green-400" />
                                            <span className="text-sm text-green-400 font-medium">
                                                {client.currency}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <button
                                        onClick={() => handleDropdownToggle(client.id)}
                                        className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-200 text-gray-300 hover:text-white"
                                    >
                                        <MoreVertical className="w-4 h-4" />
                                    </button>

                                    {showDropdown === client.id && (
                                        <div className="absolute right-0 top-10 w-36 bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl py-2 z-10">
                                            <button className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 transition-colors flex items-center space-x-2">
                                                <Eye className="w-4 h-4" />
                                                <span>View</span>
                                            </button>
                                            <button className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 transition-colors flex items-center space-x-2">
                                                <Edit className="w-4 h-4" />
                                                <span>Edit</span>
                                            </button>
                                            <button className="w-full px-4 py-2 text-left text-sm text-red-300 hover:bg-red-500/10 transition-colors flex items-center space-x-2">
                                                <Trash2 className="w-4 h-4" />
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                        <Mail className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                                            Email
                                        </p>
                                        <p className="text-sm text-white">{client.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                                        <Phone className="w-4 h-4 text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                                            Phone
                                        </p>
                                        <p className="text-sm text-white">
                                            {formatPhone(client.phone)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                        <CreditCard className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                                            PAN Number
                                        </p>
                                        <p className="text-sm text-white font-mono">
                                            {client.panNumber}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-slate-500/20 rounded-lg flex items-center justify-center">
                                            <FileText className="w-4 h-4 text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wide">
                                                Invoices
                                            </p>
                                            <p className="text-lg font-bold text-white">
                                                {client.numberOfInvoices}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div
                                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${client.numberOfInvoices > 20
                                                    ? "bg-green-500/20 text-green-400"
                                                    : client.numberOfInvoices > 10
                                                        ? "bg-yellow-500/20 text-yellow-400"
                                                        : "bg-gray-500/20 text-gray-400"
                                                }`}
                                        >
                                            {client.numberOfInvoices > 20
                                                ? "High Volume"
                                                : client.numberOfInvoices > 10
                                                    ? "Active"
                                                    : "New Client"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-r from-gray-600/0 to-slate-700/0 group-hover:from-gray-600/5 group-hover:to-slate-700/5 rounded-2xl transition-all duration-300 pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientCard;
