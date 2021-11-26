import { EntityRepository, Repository } from "typeorm";
import { Tire } from "../entity/tire.entity";
import { Trim } from "../entity/trim.entity";

@EntityRepository(Tire)
export class TireRepository extends Repository<Tire> {
	async saveTrimTire(trim: Trim, res) {
		const [frontWidth, frontRatio, frontWheelSzie] = res.frontTire.value
			.replace(/[/R]/gi, ",")
			.split(",")
			.map((element) => parseInt(element));

		const [rearWidth, rearRatio, rearWheelSzie] = res.rearTire.value
			.replace(/[/R]/gi, ",")
			.split(",")
			.map((element) => parseInt(element));

		const createFrontTire: Tire = await this.create({
			width: frontWidth,
			aspectRatio: frontRatio,
			wheelSize: frontWheelSzie,
			codeId: 1,
			trim: trim
		});

		const createRearTire: Tire = await this.create({
			width: rearWidth,
			aspectRatio: rearRatio,
			wheelSize: rearWheelSzie,
			codeId: 2,
			trim: trim
		});

		await this.save(createFrontTire);
		await this.save(createRearTire);
	}
}
