import { Controller, Get, Query, Request, UseGuards } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { AuthUser } from "src/global/decorator/authUser.decorator";
import { JwtGuard } from "../auth/guard/jwt.guard";
import { TireService } from "./tire.service";

@Controller("tire")
export class TireController {
	constructor(private readonly tireService: TireService) {}

	@UseGuards(JwtGuard)
	@Get()
	@ApiOperation({
		summary: "사용자 차종의 타이어 조회 API",
		description: "사용자가 소유한 자동차의 타이어 정보를 조회합니다."
	})
	async getTrimTire(
		@AuthUser() userId: string,
		@Query("trimId") trimId: number
	) {
		console.log(trimId);
		return await this.tireService.findTrimTire(userId, trimId);
	}
}
