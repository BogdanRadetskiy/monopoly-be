import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegistrationDto } from 'src/auth';
import { UpdateUserRequest } from '../../entity/users/dto';
import { User } from '../../entity/users/entities/user.entity';

@Injectable()
export class UsersRepository {
	constructor(
		@InjectModel(User.name)
		private userModel: Model<User>
	) {}

	async create(createUserDto: RegistrationDto): Promise<User> {
		const createdUser = new this.userModel(createUserDto);
		return createdUser.save();
	}

	async findAll(): Promise<User[]> {
		return this.userModel.find().populate({ path: 'friends', model: 'User' });
	}

	async findOneById(id: string): Promise<User> {
		return this.userModel.findById({ _id: id }).populate({ path: 'friends', model: 'User' });
	}

	async findOneByEmail(email: string): Promise<User> {
		return this.userModel.findOne({ email }).populate({ path: 'friends', model: 'User' });
	}

	async findOneByUsername(username: string): Promise<User> {
		return this.userModel.findOne({ username });
	}

	async searchUsers(username: string): Promise<User[]> {
		return this.userModel
			.find({ username: { $regex: username } })
			.populate({ path: 'friends', model: 'User' })
			.limit(5);
	}

	async remove(id: string): Promise<void> {
		await this.userModel.findOneAndDelete({ _id: id });
	}

	async update(id: string, updateUserDto: UpdateUserRequest): Promise<User> {
		return this.userModel
			.findByIdAndUpdate({ _id: id }, updateUserDto, { new: true })
			.populate({ path: 'friends', model: 'User' });
	}
}
