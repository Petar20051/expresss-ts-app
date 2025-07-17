import {z} from 'zod';

export const warehouseIdParamSchema = z.object({
	id: z.uuid(),
});

export const createWarehouseSchema = z.object({
	companyId: z.uuid(),
	name: z.string().min(1).max(100),
	location: z.string().min(1),
	supportedType: z.enum(['solid', 'liquid']),
	modifiedByUserId: z.uuid().nullable().optional(),
});

export const updateWarehouseSchema = createWarehouseSchema.partial();
