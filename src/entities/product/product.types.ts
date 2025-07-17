export type CreateProductDto = {
	companyId: string;
	name: string;
	sku: string;
	productType: 'solid' | 'liquid';
	description?: string;
	basePrice: number;
	modifiedByUserId?: string;
};

export type UpdateProductDto = Partial<CreateProductDto>;
