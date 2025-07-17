import {z} from 'zod';
import {createWarehouseSchema, updateWarehouseSchema} from './warehouse.schemas.js';

export type CreateWarehouseDto = z.infer<typeof createWarehouseSchema>;
export type UpdateWarehouseDto = z.infer<typeof updateWarehouseSchema>;
