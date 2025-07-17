export type CreatePartnerDto = {
	companyId: string;
	name: string;
	type: 'customer' | 'supplier';
	email?: string;
	phone?: string;
	address?: string;
	modifiedByUserId?: string;
};

export type UpdatePartnerDto = Partial<CreatePartnerDto>;
