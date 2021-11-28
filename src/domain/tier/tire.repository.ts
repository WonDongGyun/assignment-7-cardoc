import { tireParse } from "src/global/util/tireParse";
import {
	EntityManager,
	EntityRepository,
	Repository,
	TransactionManager
} from "typeorm";
import { Code } from "../entity/code.entity";
import { Tire } from "../entity/tire.entity";
import { Trim } from "../entity/trim.entity";
import { User } from "../entity/user.entity";

@EntityRepository(Tire)
export class TireRepository extends Repository<Tire> {
	async saveTrimTire(
		@TransactionManager() transactionManager: EntityManager,
		trim: Trim,
		res
	) {
		const {
			vehicle: frontVehicle,
			width: frontWidth,
			ratio: frontRatio,
			construction: frontConstruction,
			wheelSize: frontWheelSize
		} = tireParse(res.frontTire.value);

		const {
			vehicle: rearVehicle,
			width: rearWidth,
			ratio: rearRatio,
			construction: rearConstruction,
			wheelSize: rearWheelSize
		} = tireParse(res.rearTire.value);

		const createFrontTire: Tire = await transactionManager.create(Tire, {
			vehicle: frontVehicle,
			construction: frontConstruction,
			width: frontWidth,
			aspectRatio: frontRatio,
			wheelSize: frontWheelSize,
			codeId: 1,
			trim: trim
		});

		const createRearTire: Tire = await transactionManager.create(Tire, {
			vehicle: rearVehicle,
			construction: rearConstruction,
			width: rearWidth,
			aspectRatio: rearRatio,
			wheelSize: rearWheelSize,
			codeId: 2,
			trim: trim
		});

		await transactionManager.save(Tire, createFrontTire);
		await transactionManager.save(Tire, createRearTire);
	}

	async findTrimTire(userId: string, trimId: number) {
		return this.createQueryBuilder("ti")
			.select("ti.unit", "unit")
			.addSelect("ti.multiValues", "multiValues")
			.addSelect(
				`CASE WHEN ti.width = 0 THEN "" ELSE CONCAT(ti.vehicle, ti.width, '/', ti.aspectRatio, ti.construction, ti.wheelSize) END`,
				"value"
			)
			.addSelect(
				`CASE WHEN c.codeName = 'frontTire' THEN '타이어 전' else '타이어 후' END`,
				"TireLoc"
			)
			.innerJoin(Trim, "t", "t.trimId = ti.trimId")
			.innerJoin(User, "u", "u.id = t.id")
			.innerJoin(Code, "c", "c.codeId = ti.codeId")
			.where("u.id = :id", { id: userId })
			.andWhere("t.trimId = :trimId", { trimId: trimId })
			.getRawMany();
	}
}
