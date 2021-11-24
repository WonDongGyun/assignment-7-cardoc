import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./domain/entity/user.entity";
import { UserModule } from "./domain/user/user.module";
import { AuthModule } from "./domain/auth/auth.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		TypeOrmModule.forRoot({
			type: "mysql",
			host: process.env.DB_HOST,
			port: 3306,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [User],
			synchronize: true,
			keepConnectionAlive: true,
			logging: true
		}),
		UserModule,
		AuthModule
	]
})
export class AppModule {}
