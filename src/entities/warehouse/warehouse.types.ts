export type CreateWarehouseDto = {
	companyId: string;
	name: string;
	location: string;
	supportedType: 'solid' | 'liquid';
	modifiedByUserId?: string;
};

export type UpdateWarehouseDto = {
	name?: string;
	location?: string;
	supportedType?: 'solid' | 'liquid';
	modifiedByUserId?: string;
};
