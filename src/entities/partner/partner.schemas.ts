import {z} from 'zod';

export const createPartnerSchema = z.object({
	companyId: z.uuid(),
	name: z.string().min(1),
	type: z.enum(['customer', 'supplier']),
	email: z.email().optional(),
	phone: z.string().optional(),
	address: z.string().optional(),
	modifiedByUserId: z.uuid().optional(),
});

export const updatePartnerSchema = createPartnerSchema.partial();

export const partnerIdParamSchema = z.object({
	id: z.uuid(),
});
