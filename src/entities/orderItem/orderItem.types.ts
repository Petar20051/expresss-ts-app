export type CreateOrderItemDto = {
	orderId: string;
	productId: string;
	quantity: number;
	unitPrice: number;
	modifiedByUserId?: string;
};

export type UpdateOrderItemDto = Partial<CreateOrderItemDto>;
