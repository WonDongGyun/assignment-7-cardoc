import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Trim } from "../entity/trim.entity";
import { User } from "../entity/user.entity";
import { TireRepository } from "../tier/tire.repository";
import { UserRepository } from "../user/user.repository";
import { SaveUserTrimDto } from "./dto/saveUserTrim.dto";
import { TrimRepository } from "./trim.repository";

@Injectable()
export class TrimService {
	constructor(
		private readonly trimRepository: TrimRepository,
		private readonly tireRepository: TireRepository,
		private readonly userRepository: UserRepository
	) {}

	async saveUserTrim(saveUserTrimDto: SaveUserTrimDto, res) {
		const findUser: User = await this.userRepository.findUser(
			saveUserTrimDto.id
		);

		const createTrim: Trim = await this.trimRepository.saveUserTrim(
			findUser,
			saveUserTrimDto.trimId
		);

		await this.tireRepository.saveTrimTire(createTrim, res);

		return createTrim;
	}
}
