import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../auth/guard/jwt.guard";
import { TierService } from "./tire.service";

@Controller("tire")
export class TierController {
	constructor(private readonly tireService: TierService) {}

	@UseGuards(JwtGuard)
	@Get()
	async findUserTire(@Request() req) {
		return await this.tireService.findUserTire(req.user);
	}
}
