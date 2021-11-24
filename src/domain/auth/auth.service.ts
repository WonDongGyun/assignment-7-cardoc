import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../user/user.repository";
import * as bcrypt from "bcrypt";
import { User } from "../entity/user.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		private readonly userRepository: UserRepository,
		private jwtService: JwtService
	) {}
	async validateUser(id: string, password: string) {
		const user = await this.userRepository.findUser(id);
		if (
			!user ||
			(user && !(await bcrypt.compare(password, user.password)))
		) {
			throw new NotFoundException();
		}
		return user;
	}

	makeToken(user: User) {
		const payload = { id: user.id };
		return this.jwtService.sign(payload);
	}
}
