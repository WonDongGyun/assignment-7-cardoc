import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { Trim } from "../entity/trim.entity";
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
			Trim,
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
