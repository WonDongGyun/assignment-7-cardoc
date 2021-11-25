import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./domain/entity/user.entity";
import { UserModule } from "./domain/user/user.module";
import { AuthModule } from "./domain/auth/auth.module";
import { TrimController } from './domain/trim/trim.controller';
import { TrimService } from './domain/trim/trim.service';
import { TrimModule } from './domain/trim/trim.module';

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
		AuthModule,
		TrimModule
	],
	controllers: [TrimController],
	providers: [TrimService]
})
export class AppModule {}
