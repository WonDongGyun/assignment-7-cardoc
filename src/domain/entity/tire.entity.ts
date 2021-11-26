import { ApiProperty } from "@nestjs/swagger";
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from "typeorm";
import { BaseModel } from "./base/base.entity";
import { Trim } from "./trim.entity";

@Entity("tire")
export class Tire extends BaseModel {
	@PrimaryGeneratedColumn("increment")
	@ApiProperty({ description: "tireId" })
	tireId!: number;

	@Column("varchar", { length: 5, default: "" })
	@ApiProperty({ description: "unit" })
	unit?: string;

	@Column("varchar", { default: "" })
	@ApiProperty({ description: "multiValues" })
	multiValues?: string;

	@Column("smallint", { nullable: false })
	@ApiProperty({ description: "width" })
	width!: number;

	@Column("smallint", { nullable: false })
	@ApiProperty({ description: "aspectRatio" })
	aspectRatio!: number;

	@Column("smallint", { nullable: false })
	@ApiProperty({ description: "wheelSize" })
	wheelSize!: number;

	@Column("int", { nullable: false })
	codeId!: number;

	@ManyToOne(() => Trim, (trim) => trim.tire, { lazy: true })
	@JoinColumn([{ name: "trimId", referencedColumnName: "trimId" }])
	trim: Trim;
}
