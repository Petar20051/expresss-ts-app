import {z} from 'zod';

export const companyIdParamSchema = z.object({
	id: z.uuid('Invalid UUID'),
});

export const createCompanySchema = z.object({
	name: z.string().min(1, 'Name cannot be empty').max(100, 'Name must be at most 100 characters'),
	email: z.string().email('Email must be a valid email address').max(100, 'Email must be at most 100 characters'),
});

export const updateCompanySchema = createCompanySchema.partial();
