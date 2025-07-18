import {z} from 'zod';

export const userIdParamSchema = z.object({
	id: z.uuid('Invalid UUID'),
});

export const createUserSchema = z.object({
	companyId: z.uuid('Company ID must be a valid UUID'),
	fullName: z.string().min(1, 'Full name cannot be empty').max(100, 'Full name must be at most 100 characters'),
	email: z.email('Email must be a valid email address').max(150, 'Email must be at most 150 characters'),
});

export const updateUserSchema = createUserSchema.partial();
