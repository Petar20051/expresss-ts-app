export type CreateInvoiceDto = {
	invoiceNumber: string;
	orderId: string;
	status: 'unpaid' | 'paid' | 'overdue';
	date?: Date;
	modifiedByUserId?: string;
};

export type UpdateInvoiceDto = {
	invoiceNumber?: string;
	status?: 'unpaid' | 'paid' | 'overdue';
	date?: Date;
	modifiedByUserId?: string;
};
