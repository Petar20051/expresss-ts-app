import {z} from 'zod';
import {createUserSchema, updateUserSchema} from './user.schemas.js';

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
