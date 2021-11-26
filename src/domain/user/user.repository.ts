import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { CreateUserDto } from "./dto/createUser.dto";
import { NotFoundUserException } from "./exception/NotFoundUserException";
import { UserOverlapException } from "./exception/UserOverlapException";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async findUser(id: string) {
		const findUser = await this.findOne({ id: id });

		if (!findUser) {
			throw new NotFoundUserException();
		}

		return findUser;
	}

	async createUser(createUserDto: CreateUserDto) {
		const findUser = await this.findOne({ id: createUserDto.id });

		if (findUser) {
			throw new UserOverlapException();
		}

		return await this.save(
			this.create({
				id: createUserDto.id,
				password: createUserDto.password
			})
		);
	}
}
