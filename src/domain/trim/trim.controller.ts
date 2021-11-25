import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard/jwt.guard";
import { SaveUserTrimDto } from "./dto/saveUserTrim.dto";

@Controller("trim")
export class TrimController {
	@UseGuards(JwtGuard)
	@Post("")
	@ApiOperation({
		summary: "사용자 차종 저장 API",
		description: "사용자가 소유한 자동차 정보를 저장합니다."
	})
	async userTrim(@Body() saveUserTrimDto: SaveUserTrimDto) {
		return null;
	}
}
