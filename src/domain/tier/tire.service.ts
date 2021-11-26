import { Injectable } from "@nestjs/common";
import { TireRepository } from "./tire.repository";

@Injectable()
export class TierService {
	constructor(private readonly tireRepository: TireRepository) {}

	async findUserTire(user) {
		return await this.tireRepository.findOne(user);
	}
}
