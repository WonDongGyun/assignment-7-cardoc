import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Code } from "typeorm";
import { AuthModule } from "../auth/auth.module";
import { Tire } from "../entity/tire.entity";
import { Trim } from "../entity/trim.entity";
import { User } from "../entity/user.entity";
import { TireController } from "./tire.controller";
import { TireRepository } from "./tire.repository";
import { TireService } from "./tire.service";

@Module({
	imports: [TypeOrmModule.forFeature([Tire, TireRepository]), AuthModule],
	controllers: [TireController],
	providers: [TireService]
})
export class TierModule {}
