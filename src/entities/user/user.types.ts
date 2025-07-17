export type CreateUserDto = {
	companyId: string;
	fullName: string;
	email: string;
	modifiedByUserId?: string;
};

export type UpdateUserDto = {
	fullName?: string;
	email?: string;
	modifiedByUserId?: string;
};
