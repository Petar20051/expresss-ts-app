import {z} from 'zod';

export const orderItemIdParamSchema = z.object({
	id: z.uuid(),
});

export const createOrderItemSchema = z.object({
	orderId: z.uuid(),
	productId: z.uuid(),
	quantity: z.number().int().positive(),
	unitPrice: z.number().positive(),
});

export const updateOrderItemSchema = createOrderItemSchema.partial();
