export type CreateOrderDto = {
	companyId: string;
	orderType: 'shipment' | 'delivery';
	partnerId?: string;
	warehouseId: string;
	notes?: string;
	date?: Date;
	modifiedByUserId: string;
};

export type UpdateOrderDto = {
	orderType?: 'shipment' | 'delivery';
	partnerId?: string;
	warehouseId?: string;
	notes?: string;
	date?: Date;
	modifiedByUserId?: string;
};
