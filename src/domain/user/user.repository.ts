import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { CreateUserDto } from "./dto/createUser.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async findUser(id: string) {
		return await this.findOne({ id: id });
	}

	async createUser(createUserDto: CreateUserDto) {
		const findUser = await this.findUser(createUserDto.id);

		if (findUser) {
			throw new NotFoundException();
		}
		return await this.save(
			this.create({
				id: createUserDto.id,
				password: createUserDto.password
			})
		);
	}
}
