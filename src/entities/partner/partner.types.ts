import {z} from 'zod';
import {createPartnerSchema, updatePartnerSchema} from './partner.schemas.js';

export type CreatePartnerDto = z.infer<typeof createPartnerSchema>;
export type UpdatePartnerDto = z.infer<typeof updatePartnerSchema>;
