import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./domain/entity/user.entity";
import { UserModule } from "./domain/user/user.module";
import { AuthModule } from "./domain/auth/auth.module";
import { TrimModule } from "./domain/trim/trim.module";
import { HttpModule } from "@nestjs/axios";
import { Trim } from "./domain/entity/trim.entity";
import { Tire } from "./domain/entity/tire.entity";
import { Code } from "./domain/entity/code.entity";
import { TireModule } from "./domain/tier/tire.module";
import { getOrmConfig } from "./typeOrmConfig";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		TypeOrmModule.forRoot(getOrmConfig()),
		UserModule,
		AuthModule,
		TrimModule,
		HttpModule,
		TireModule
	]
})
export class AppModule {}
