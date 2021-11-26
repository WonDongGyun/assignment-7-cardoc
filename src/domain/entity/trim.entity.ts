import { ApiProperty } from "@nestjs/swagger";
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryColumn
} from "typeorm";
import { BaseModel } from "./base/base.entity";
import { Tire } from "./tire.entity";
import { User } from "./user.entity";

@Entity("trim")
export class Trim extends BaseModel {
	@PrimaryColumn("int")
	@ApiProperty({ description: "trimId" })
	trimId!: number;

	@ManyToOne(() => User, (user) => user.trim, { lazy: true })
	@JoinColumn([{ name: "id", referencedColumnName: "id" }])
	user: User;

	@OneToMany(() => Tire, (tire) => tire.trim)
	tire?: Tire[];
}
