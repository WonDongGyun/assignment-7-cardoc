import { ApiProperty } from "@nestjs/swagger";
import {
	BeforeInsert,
	Column,
	Entity,
	OneToMany,
	PrimaryColumn
} from "typeorm";
import { BaseModel } from "./base/base.entity";
import * as bcrypt from "bcrypt";
import { Trim } from "./trim.entity";
import { Exclude } from "class-transformer";

@Entity("user")
export class User extends BaseModel {
	@PrimaryColumn("varchar", { length: 15 })
	@ApiProperty({ description: "ID" })
	id!: string;

	@Column("varchar", { nullable: false })
	@ApiProperty({ description: "비밀번호" })
	@Exclude()
	password!: string;

	@OneToMany(() => Trim, (trim) => trim.user)
	trim?: Trim[];

	@BeforeInsert()
	async hashPw(): Promise<void> {
		this.password = await bcrypt.hash(this.password, 10);
	}
}
