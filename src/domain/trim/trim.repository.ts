import { Injectable } from "@nestjs/common";
import { EntityManager, EntityRepository, Repository } from "typeorm";
import { Trim } from "../entity/trim.entity";
import { User } from "../entity/user.entity";

@EntityRepository(Trim)
export class TrimRepository extends Repository<Trim> {
	async saveUserTrim(findUser: User, trimId: number) {
		const createTrim: Trim = await this.create({
			trimId: trimId,
			user: findUser
		});

		return await this.save(createTrim);
	}
}
