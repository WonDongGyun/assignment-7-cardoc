import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class SaveUserTrimDto {
	@IsString()
	@IsNotEmpty()
	id!: string;

	@IsInt()
	@IsNotEmpty()
	trimId!: number;
}
