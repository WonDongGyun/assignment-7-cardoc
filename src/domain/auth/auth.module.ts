import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { UserRepository } from "../user/user.repository";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./auth.localStrategy";
import { JwtStrategy } from "./auth.jwtStrategy";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		PassportModule,
		ConfigModule.forRoot({
			isGlobal: true
		}),
		TypeOrmModule.forFeature([User, UserRepository]),
		JwtModule.register({
			secret: process.env.JWT_KEY,
			signOptions: { expiresIn: "1H" }
		})
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [AuthService]
})
export class AuthModule {}
