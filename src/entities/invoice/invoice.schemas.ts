import {z} from 'zod';

export const invoiceIdParamSchema = z.object({
	id: z.uuid('Invalid UUID'),
});

export const createInvoiceSchema = z.object({
	invoiceNumber: z.string().min(1, 'Invoice number cannot be empty').max(50, 'Invoice number must be at most 50 characters'),
	orderId: z.uuid('Order ID must be a valid UUID'),
	status: z.enum(['unpaid', 'paid', 'overdue'], 'Invalid status'),
});

export const updateInvoiceSchema = createInvoiceSchema.partial();
