import {z} from 'zod';

export const userIdParamSchema = z.object({
	id: z.uuid(),
});

export const createUserSchema = z.object({
	companyId: z.uuid(),
	fullName: z.string().min(1).max(100),
	email: z.email().max(150),
});

export const updateUserSchema = createUserSchema.partial();
