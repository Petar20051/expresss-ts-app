import {z} from 'zod';

export const orderIdParamSchema = z.object({
	id: z.uuid(),
});

export const createOrderSchema = z.object({
	companyId: z.uuid(),
	orderType: z.enum(['shipment', 'delivery']),
	partnerId: z.uuid().nullable().optional(),
	warehouseId: z.uuid(),
	notes: z.string().optional(),
	modifiedByUserId: z.string().uuid(),
});

export const updateOrderSchema = createOrderSchema.partial();
