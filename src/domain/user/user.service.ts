import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async createUser(createUserDto: CreateUserDto) {
		return await this.userRepository.createUser(createUserDto);
	}
}
