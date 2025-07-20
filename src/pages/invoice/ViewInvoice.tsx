import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toastError } from "../../utils/sonner/toastError";
import { InvoiceService } from "../../services/api/invoiceService";
import html2canvas from "html2canvas";
import {
    FileText,
    Building2,
    Calendar,
    CreditCard,
    Download,
    ArrowLeft,
    CheckCircle,
    XCircle,
    AlertCircle,
    StickyNote,
    IndianRupee,
} from "lucide-react";
import { Toaster } from "sonner";
import jsPDF from "jspdf";

interface IItem {
    details: string;
    quantity: number;
    rate: number;
    total: number;
}

interface IInvoice {
    company: {
        _id: string;
        name: string;
    };
    invoiceNumber: number;
    invoiceDate: string;
    dueDate: string;
    items: IItem[];
    total: number;
    notes: string;
    paymentGateway: string;
    paid: boolean;
}

const ViewInvoice = () => {
    const [invoice, setInvoice] = useState<IInvoice>({
        company: {
            _id: "",
            name: "",
        },
        invoiceNumber: 0,
        invoiceDate: "",
        dueDate: "",
        items: [],
        total: 0,
        notes: "",
        paymentGateway: "",
        paid: false,
    });
    const { invoiceId } = useParams();
    const invoiceRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            const ViewInvoiceFunction = async (): Promise<void> => {
                const response = await InvoiceService.viewInvoice(invoiceId);

                if (!response.success) {
                    toastError(response.message);
                } else {
                    setInvoice(response.invoice);
                }
            };

            ViewInvoiceFunction();
        } catch (error) {
            console.log("ERROR: ", error);
        }
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const handleDownload = async () => {
        const input = invoiceRef.current;
        if (!input) return;

        const canvas = await html2canvas(input, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: [canvas.width, canvas.height],
        });

        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("invoice.pdf");
    };

    const getStatusBadge = () => {
        if (invoice.paid) {
            return (
                <div className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-2xl border border-green-500/30">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-semibold">Paid</span>
                </div>
            );
        } else {
            const dueDate = new Date(invoice.dueDate);
            const today = new Date();
            const isOverdue = today > dueDate;

            if (isOverdue) {
                return (
                    <div className="flex items-center space-x-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-2xl border border-red-500/30">
                        <XCircle className="w-4 h-4" />
                        <span className="font-semibold">Overdue</span>
                    </div>
                );
            } else {
                return (
                    <div className="flex items-center space-x-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-2xl border border-yellow-500/30">
                        <AlertCircle className="w-4 h-4" />
                        <span className="font-semibold">Pending</span>
                    </div>
                );
            }
        }
    };

    return (
        <div className="min-h-screen p-6">
            <Toaster />
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <Link to="/invoices">
                            <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-200 text-gray-300 hover:text-white border border-white/10 hover:border-white/30">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button
                            onClick={handleDownload}
                            className="flex items-center space-x-2   hover:from-gray-500 hover:to-slate-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-white/20 hover:border-white/30"
                        >
                            <Download className="w-5 h-5" />
                            <span className="font-semibold">Download</span>
                        </button>
                    </div>
                </div>

                <div
                    ref={invoiceRef}
                    style={{ backgroundColor: "white", color: "black", padding: "20px" }}
                    className="bg-white/10 backdrop-blur-xl pdf-safe border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
                >
                    <div className=" p-8 border-b border-white/20">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16  rounded-3xl flex items-center justify-center shadow-lg">
                                    <FileText className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">
                                        Invoice #{invoice.invoiceNumber}
                                    </h2>
                                    <p className="text-gray-400">
                                        Generated for {invoice.company.name}
                                    </p>
                                </div>
                            </div>
                            {getStatusBadge()}
                        </div>
                    </div>

                    <div className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                                    <Building2 className="w-5 h-5" />
                                    <span>Client Information</span>
                                </h3>
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                    <h4 className="text-xl font-bold text-white mb-2">
                                        {invoice.company.name}
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        Company ID: {invoice.company._id}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                                    <Calendar className="w-5 h-5" />
                                    <span>Invoice Details</span>
                                </h3>
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Invoice Date:</span>
                                        <span className="text-white font-semibold">
                                            {formatDate(invoice.invoiceDate)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Due Date:</span>
                                        <span className="text-white font-semibold">
                                            {formatDate(invoice.dueDate)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-white/10">
                                        <span className="text-gray-400">Payment Gateway:</span>
                                        <div className="flex items-center space-x-2">
                                            <CreditCard className="w-4 h-4 text-gray-400" />
                                            <span className="text-white font-semibold">
                                                {invoice.paymentGateway}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
                                <FileText className="w-5 h-5" />
                                <span>Invoice Items</span>
                            </h3>

                            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                                <div className="bg-white/5 px-6 py-4 border-b border-white/10">
                                    <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-300 uppercase tracking-wider">
                                        <div className="col-span-6">Description</div>
                                        <div className="col-span-2 text-center">Quantity</div>
                                        <div className="col-span-2 text-right">Rate</div>
                                        <div className="col-span-2 text-right">Total</div>
                                    </div>
                                </div>

                                <div className="divide-y divide-white/10">
                                    {invoice.items.map((item: IItem, index) => (
                                        <div
                                            key={index}
                                            className="px-6 py-4 hover:bg-white/5 transition-colors duration-200"
                                        >
                                            <div className="grid grid-cols-12 gap-4 items-center">
                                                <div className="col-span-6">
                                                    <p className="text-white font-medium">
                                                        {item.details}
                                                    </p>
                                                </div>
                                                <div className="col-span-2 text-center">
                                                    <span className="text-gray-300">{item.quantity}</span>
                                                </div>
                                                <div className="col-span-2 text-right">
                                                    <span className="text-gray-300">{item.rate}</span>
                                                </div>
                                                <div className="col-span-2 text-right">
                                                    <span className="text-white font-semibold">
                                                        {item.total}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-white/5 px-6 py-6 border-t border-white/10">
                                    <div className="flex justify-end">
                                        <div className="w-64">
                                            <div className="flex justify-between items-center text-2xl font-bold">
                                                <span className="text-gray-300">Total:</span>
                                                <span className="text-white flex items-center space-x-2">
                                                    <IndianRupee className="w-6 h-6" />
                                                    <span>{invoice.total}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {invoice.notes && (
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                                    <StickyNote className="w-5 h-5" />
                                    <span>Notes</span>
                                </h3>
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                    <p className="text-gray-300 leading-relaxed">
                                        {invoice.notes}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewInvoice;
