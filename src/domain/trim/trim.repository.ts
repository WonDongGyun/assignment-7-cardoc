import {
	EntityManager,
	EntityRepository,
	Repository,
	TransactionManager
} from "typeorm";
import { Trim } from "../entity/trim.entity";
import { User } from "../entity/user.entity";
import { NotFoundUserTrimException } from "./exception/NotFoundUserTrimException";
import { TrimOverlapException } from "./exception/TrimOverlapException";

@EntityRepository(Trim)
export class TrimRepository extends Repository<Trim> {
	async saveUserTrim(
		@TransactionManager() transactionManager: EntityManager,
		findUser: User,
		trimId: number
	) {
		const findTrim = await transactionManager.findOne(Trim, {
			trimId: trimId,
			user: findUser
		});

		if (findTrim) {
			throw new TrimOverlapException();
		}

		const createTrim: Trim = await transactionManager.create(Trim, {
			trimId: trimId,
			user: findUser
		});

		return await transactionManager.save(Trim, createTrim);
	}

	async findUserTrim(userId: string, trimId: number) {
		const user = new User();
		user.id = userId;

		const findTrim = await this.findOne({ trimId: trimId, user: user });

		if (!findTrim) {
			throw new NotFoundUserTrimException();
		}

		return findTrim;
	}
}
