import {z} from 'zod';

export const orderItemIdParamSchema = z.object({
	id: z.uuid('Invalid UUID'),
});

export const createOrderItemSchema = z.object({
	orderId: z.uuid('Order ID must be a valid UUID'),
	productId: z.uuid('Product ID must be a valid UUID'),
	quantity: z.number().positive('Quantity must be a positive number'),
	unitPrice: z.number().positive('Unit price must be a positive number'),
});

export const updateOrderItemSchema = createOrderItemSchema.partial();
