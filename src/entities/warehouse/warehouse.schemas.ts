import {z} from 'zod';

export const warehouseIdParamSchema = z.object({
	id: z.uuid('Invalid UUID'),
});

export const createWarehouseSchema = z.object({
	companyId: z.string('Company ID is required').uuid('Company ID must be a valid UUID'),
	name: z.string('Name is required').min(1, 'Name cannot be empty').max(100, 'Name must be at most 100 characters'),
	location: z.string('Location is required').min(1, 'Location cannot be empty'),
	supportedType: z.enum(['solid', 'liquid'], 'Invalid type'),
});

export const updateWarehouseSchema = createWarehouseSchema.partial();
