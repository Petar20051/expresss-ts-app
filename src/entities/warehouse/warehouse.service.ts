import models from '../../db/modelsInit.js';
import {AppError} from '../../errors/appError.js';
import {CreateWarehouseDto, UpdateWarehouseDto} from './warehouse.types.js';

class WarehouseService {
	constructor(private readonly warehouseModel = models.Warehouse) {}

	async getAllWarehouses() {
		return await this.warehouseModel.findAll();
	}

	async getWarehouseById(id: string) {
		const warehouse = await this.warehouseModel.findByPk(id);
		if (!warehouse) throw new AppError('Warehouse not found', 404);
		return warehouse;
	}

	async createWarehouse(data: CreateWarehouseDto) {
		return await this.warehouseModel.create(data);
	}

	async updateWarehouse(id: string, data: UpdateWarehouseDto) {
		const warehouse = await this.getWarehouseById(id);
		return await warehouse.update(data);
	}

	async deleteWarehouse(id: string) {
		const warehouse = await this.getWarehouseById(id);
		return await warehouse.destroy();
	}
}

export default new WarehouseService();
