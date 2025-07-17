import {z} from 'zod';
import {createInvoiceSchema, updateInvoiceSchema} from './invoice.schemas.js';

export type CreateInvoiceDto = z.infer<typeof createInvoiceSchema>;
export type UpdateInvoiceDto = z.infer<typeof updateInvoiceSchema>;
