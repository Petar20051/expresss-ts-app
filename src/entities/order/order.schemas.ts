import {z} from 'zod';

export const orderIdParamSchema = z.object({
	id: z.uuid('Invalid UUID'),
});

export const createOrderSchema = z.object({
	companyId: z.uuid('Company ID must be a valid UUID'),
	orderType: z.enum(['shipment', 'delivery'], 'Invalid type'),
	partnerId: z.uuid('Partner ID must be a valid UUID'),
	warehouseId: z.uuid('Warehouse ID must be a valid UUID'),
	notes: z.string().optional(),
});

export const updateOrderSchema = createOrderSchema.partial();
