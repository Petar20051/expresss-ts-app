import {z} from 'zod';
import {createOrderItemSchema, updateOrderItemSchema} from './orderItem.schemas.js';

export type CreateOrderItemDto = z.infer<typeof createOrderItemSchema>;
export type UpdateOrderItemDto = z.infer<typeof updateOrderItemSchema>;
