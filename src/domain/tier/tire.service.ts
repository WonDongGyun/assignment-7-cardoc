import { Injectable } from "@nestjs/common";
import { TireRepository } from "./tire.repository";

@Injectable()
export class TireService {
	constructor(private readonly tireRepository: TireRepository) {}

	async findTrimTire(authUser, trimId: number) {
		return await this.tireRepository.findTrimTire(authUser, trimId);
	}
}
