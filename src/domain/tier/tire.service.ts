import { Injectable } from "@nestjs/common";
import { TrimRepository } from "../trim/trim.repository";
import { TireRepository } from "./tire.repository";

@Injectable()
export class TireService {
	constructor(
		private readonly tireRepository: TireRepository,
		private readonly trimRepository: TrimRepository
	) {}

	async findTrimTire(userId: string, trimId: number) {
		await this.trimRepository.findUserTrim(userId, trimId);
		return await this.tireRepository.findTrimTire(userId, trimId);
	}
}
