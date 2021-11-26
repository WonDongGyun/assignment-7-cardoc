import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { Tire } from "../entity/tire.entity";
import { TierController } from "./tire.controller";
import { TireRepository } from "./tire.repository";
import { TierService } from "./tire.service";

@Module({
	imports: [TypeOrmModule.forFeature([Tire, TireRepository]), AuthModule],
	controllers: [TierController],
	providers: [TierService]
})
export class TierModule {}
