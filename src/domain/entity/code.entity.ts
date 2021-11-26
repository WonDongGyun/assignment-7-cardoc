import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./base/base.entity";

@Entity("code")
export class Code extends BaseModel {
	@PrimaryGeneratedColumn("increment")
	@ApiProperty({ description: "codeId" })
	codeId!: number;

	@Column("varchar", { default: "" })
	@ApiProperty({ description: "codeName" })
	codeName!: string;

	@Column("boolean", { nullable: false, default: true })
	@ApiProperty({ description: "useYn" })
	useYn?: string;
}
