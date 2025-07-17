import {z} from 'zod';

export const companyIdParamSchema = z.object({
	id: z.uuid(),
});

export const createCompanySchema = z.object({
	name: z.string().min(1).max(100),
	emailDomain: z.email().max(100),
	modifiedByUserId: z.uuid().nullable().optional(),
});

export const updateCompanySchema = createCompanySchema.partial();
