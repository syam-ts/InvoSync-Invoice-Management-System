import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserService } from "../../services/api/userServices";
import { toastError } from "../../utils/sonner/toastError";
import InvoiceCard from "../../components/invoice/InvoiceCard";

interface IInvoice {
    company: string;
    invoiceNumber: number;
    invoiceDate: string;
    dueDate: string;
    items: [];
    total: number;
    notes: string;
    paymentGateway: string;
    paid: boolean;
}

const Invoices: React.FC = () => {
    const [invoices, setInvoices] = useState<IInvoice[]>([
        {
            company: "",
            invoiceNumber: 0,
            invoiceDate: "",
            dueDate: "",
            items: [],
            total: 0,
            notes: "",
            paymentGateway: "",
            paid: false,
        },
    ]);
    const { clientId } = useParams<{ clientId: string }>();

    useEffect(() => {
        try {
            const getAllInvoicesFunction = async () => {
                const response = await UserService.getAllInvoices(clientId);

                console.log("REPSON: ", response.invoices);
                if (!response.success) {
                    toastError(response.message);
                } else {
                    setInvoices(response.invoices);
                }
            };

            getAllInvoicesFunction();
        } catch (error) {
            console.log('ERROR: ',error)
         }
    }, []);

    console.log("INVOE: ", invoices);
    return (
        <div className="w-full h-screen">
            <div>
                <h1 className="text-4xl text-center text-white pt-20 font-bold">
                    Invoices
                </h1>
            </div>
            {invoices.length > 0 ? (
                <InvoiceCard invoices={invoices} />
            ) : (
                <p className="text-xl text-white mx-auto text-center py-44">
                    No Invoices Found
                </p>
            )}
        </div>
    );
};

export default Invoices;
