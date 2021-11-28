import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { Tire } from "../entity/tire.entity";
import { Trim } from "../entity/trim.entity";
import { User } from "../entity/user.entity";
import { TireRepository } from "../tier/tire.repository";
import { UserRepository } from "../user/user.repository";
import { TrimController } from "./trim.controller";
import { TrimRepository } from "./trim.repository";
import { TrimService } from "./trim.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		TypeOrmModule.forFeature([
			User,
			Trim,
			Tire,
			UserRepository,
			TrimRepository,
			TireRepository
		]),
		HttpModule,
		AuthModule
	],
	controllers: [TrimController],
	providers: [TrimService]
})
export class TrimModule {}
