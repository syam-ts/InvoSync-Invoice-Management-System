interface IItem {
    details: string;
    quantity: number;
    rate: number;
    total: number;
}

export interface IInvoice {
    companyName: string;
    companyId: string;
    dueDate: string;
    items: IItem[];
    notes: string;
    paymentGateway: string;
}
