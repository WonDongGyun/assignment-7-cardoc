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
		const [frontWidth, frontRatio, frontWheelSzie] = res.frontTire.value
			.replace(/[/R]/gi, ",")
			.split(",")
			.map((element) => parseInt(element));

		const [rearWidth, rearRatio, rearWheelSzie] = res.rearTire.value
			.replace(/[/R]/gi, ",")
			.split(",")
			.map((element) => parseInt(element));

		const createFrontTire: Tire = await transactionManager.create(Tire, {
			width: frontWidth,
			aspectRatio: frontRatio,
			wheelSize: frontWheelSzie,
			codeId: 1,
			trim: trim
		});

		const createRearTire: Tire = await transactionManager.create(Tire, {
			width: rearWidth,
			aspectRatio: rearRatio,
			wheelSize: rearWheelSzie,
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
				`CONCAT(ti.width, '/', ti.aspectRatio, 'R', ti.wheelSize)`,
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
