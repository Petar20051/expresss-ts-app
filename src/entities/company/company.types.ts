export type CreateCompanyDto = {
	name: string;
	emailDomain: string;
	modifiedByUserId?: string | null;
};

export type UpdateCompanyDto = Partial<CreateCompanyDto>;
