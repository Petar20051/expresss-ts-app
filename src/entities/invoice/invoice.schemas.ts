import {z} from 'zod';

export const invoiceIdParamSchema = z.object({
	id: z.uuid(),
});

export const createInvoiceSchema = z.object({
	invoiceNumber: z.string().min(1).max(50),
	orderId: z.uuid(),
	status: z.enum(['unpaid', 'paid', 'overdue']),
	modifiedByUserId: z.uuid().nullable().optional(),
});

export const updateInvoiceSchema = createInvoiceSchema.partial();
