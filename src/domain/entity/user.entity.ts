import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import { BaseModel } from "./base/base.entity";
import * as bcrypt from "bcrypt";

@Entity("user")
export class User extends BaseModel {
	@PrimaryColumn("varchar", { length: 15 })
	@ApiProperty({ description: "ID" })
	id!: string;

	@Column("varchar", { nullable: false })
	@ApiProperty({ description: "비밀번호" })
	password!: string;

	@BeforeInsert()
	async hashPw(): Promise<void> {
		this.password = await bcrypt.hash(this.password, 10);
	}
}
