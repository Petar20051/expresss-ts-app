import {z} from 'zod';

export const partnerIdParamSchema = z.object({
	id: z.uuid('Invalid UUID'),
});

export const createPartnerSchema = z.object({
	companyId: z.uuid('Company ID must be a valid UUID'),
	name: z.string().min(1, 'Name cannot be empty').max(100, 'Name must be at most 100 characters'),
	type: z.enum(['customer', 'supplier'], 'Invalid type'),
	email: z.string().email('Email must be a valid email address').max(150, 'Email must be at most 150 characters').optional().nullable(),
	phone: z.string().max(20, 'Phone number must be at most 20 characters').optional().nullable(),
	address: z.string().optional().nullable(),
	modifiedByUserId: z.uuid('Modified by User ID must be a valid UUID'),
});

export const updatePartnerSchema = createPartnerSchema.partial();
