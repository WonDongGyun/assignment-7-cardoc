import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({ usernameField: "id" });
	}

	async validate(id: string, password: string) {
		const user = this.authService.validateUser(id, password);
		if (!user) {
			return null;
		}
		return user;
	}
}
