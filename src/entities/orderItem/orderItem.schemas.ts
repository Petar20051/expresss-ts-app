import {z} from 'zod';

export const orderItemIdParamSchema = z.object({
	id: z.uuid(),
});

export const createOrderItemSchema = z.object({
	orderId: z.uuid(),
	productId: z.uuid(),
	quantity: z.number().int().min(1),
	unitPrice: z.number().min(0),
	modifiedByUserId: z.uuid().nullable().optional(),
});

export const updateOrderItemSchema = createOrderItemSchema.partial();
