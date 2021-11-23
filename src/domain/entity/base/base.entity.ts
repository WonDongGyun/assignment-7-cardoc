import { ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseModel {
	@CreateDateColumn()
	@ApiProperty({ description: "생성 날짜" })
	createdAt!: Date;

	@UpdateDateColumn()
	@ApiProperty({ description: "수정 날짜" })
	updatedAt!: Date;
}
