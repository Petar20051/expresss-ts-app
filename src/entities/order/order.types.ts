import {z} from 'zod';
import {createOrderSchema, updateOrderSchema} from './order.schemas.js';

export type CreateOrderDto = z.infer<typeof createOrderSchema>;
export type UpdateOrderDto = z.infer<typeof updateOrderSchema>;
