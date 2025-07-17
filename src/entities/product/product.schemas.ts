import {z} from 'zod';

export const productIdParamSchema = z.object({
	id: z.uuid(),
});

export const createProductSchema = z.object({
	companyId: z.uuid(),
	name: z.string().min(1).max(100),
	sku: z.string().min(1).max(50),
	productType: z.enum(['solid', 'liquid']),
	description: z.string().nullable().optional(),
	basePrice: z.number().nonnegative(),
	modifiedByUserId: z.uuid(),
});

export const updateProductSchema = createProductSchema.partial();
