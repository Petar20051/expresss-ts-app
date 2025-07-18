import {z} from 'zod';

export const productIdParamSchema = z.object({
	id: z.uuid('Invalid UUID'),
});

export const createProductSchema = z.object({
	companyId: z.uuid('Company ID must be a valid UUID'),
	name: z.string().min(1, 'Name cannot be empty').max(100, 'Name must be at most 100 characters'),
	sku: z.string().min(1, 'SKU cannot be empty').max(50, 'SKU must be at most 50 characters'),
	productType: z.enum(['solid', 'liquid'], 'Invalid type'),
	description: z.string().optional().nullable(),
	basePrice: z.number().positive('Base price must be a positive number'),
});

export const updateProductSchema = createProductSchema.partial();
