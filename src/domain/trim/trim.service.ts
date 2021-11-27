import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection } from "typeorm";
import { Tire } from "../entity/tire.entity";
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
		const queryRunner = await getConnection().createQueryRunner();
		await queryRunner.startTransaction();

		const findUser: User = await this.userRepository.findUser(
			saveUserTrimDto.id
		);

		try {
			const createTrim: Trim = await this.trimRepository.saveUserTrim(
				queryRunner.manager,
				findUser,
				saveUserTrimDto.trimId
			);

			await this.tireRepository.saveTrimTire(
				queryRunner.manager,
				createTrim,
				res
			);

			await queryRunner.commitTransaction();
			return createTrim;
		} catch (err) {
			console.log(err);
			await queryRunner.rollbackTransaction();
		} finally {
			await queryRunner.release();
		}
	}
}
