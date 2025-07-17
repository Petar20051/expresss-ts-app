import {z} from 'zod';
import {createCompanySchema, updateCompanySchema} from './company.schemas.js';

export type CreateCompanyDto = z.infer<typeof createCompanySchema>;
export type UpdateCompanyDto = z.infer<typeof updateCompanySchema>;
