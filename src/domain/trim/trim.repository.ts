import { Injectable } from "@nestjs/common";
import { EntityManager, EntityRepository, Repository } from "typeorm";
import { Trim } from "../entity/trim.entity";
import { User } from "../entity/user.entity";
import { NotFoundUserTrimException } from "./exception/NotFoundUserTrimException";

@EntityRepository(Trim)
export class TrimRepository extends Repository<Trim> {
	async saveUserTrim(findUser: User, trimId: number) {
		const createTrim: Trim = await this.create({
			trimId: trimId,
			user: findUser
		});

		return await this.save(createTrim);
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
