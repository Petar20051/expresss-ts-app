import {z} from 'zod';

export const partnerIdParamSchema = z.object({
	id: z.uuid(),
});

export const createPartnerSchema = z.object({
	companyId: z.uuid(),
	name: z.string().min(1).max(100),
	type: z.enum(['customer', 'supplier']),
	email: z.email().max(150).nullable().optional(),
	phone: z.string().max(20).nullable().optional(),
	address: z.string().nullable().optional(),
	modifiedByUserId: z.uuid(),
});

export const updatePartnerSchema = createPartnerSchema.partial();
