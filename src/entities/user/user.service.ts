import models from '../../db/models.js';
import {AppError} from '../../errors/app-error.js';
import {CreateUserDto, UpdateUserDto} from './user.types.js';

class UserService {
	constructor(private readonly userModel = models.User) {}

	async getAllUsers() {
		return await this.userModel.findAll();
	}

	async getUserById(id: string) {
		const user = await this.userModel.findByPk(id);
		if (!user) throw new AppError('User not found');
		return user;
	}

	async createUser(data: CreateUserDto) {
		return await this.userModel.create(data);
	}

	async updateUser(id: string, data: UpdateUserDto) {
		const user = await this.getUserById(id);
		return await user.update(data);
	}

	async deleteUser(id: string) {
		const user = await this.getUserById(id);
		return await user.destroy();
	}
}

export default new UserService();
