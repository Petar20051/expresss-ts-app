import models from '../../db/models.init.js';
import {AppError} from '../../errors/app.error.js';
import {CreateUserDto, UpdateUserDto} from './user.types.js';

class UserService {
	constructor(private readonly userModel = models.User) {}

	async getAllUsers() {
		return await this.userModel.findAll();
	}

	async getUserById(id: string) {
		const user = await this.userModel.findByPk(id);
		if (!user) throw new AppError('User not found', 404);
		return user;
	}

	async createUser(data: CreateUserDto, modifiedByUserId: string) {
		return await this.userModel.create({
			...data,
			modifiedByUserId,
		});
	}

	async updateUser(id: string, data: UpdateUserDto, modifiedByUserId: string) {
		const user = await this.getUserById(id);
		return await user.update({
			...data,
			modifiedByUserId,
		});
	}

	async deleteUser(id: string) {
		const user = await this.getUserById(id);
		return await user.destroy();
	}
}

export default new UserService();
