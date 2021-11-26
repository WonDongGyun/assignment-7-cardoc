import { HttpService } from "@nestjs/axios";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guard/jwt.guard";
import { SaveUserTrimDto } from "./dto/saveUserTrim.dto";
import { lastValueFrom } from "rxjs";
import { TrimService } from "./trim.service";
@Controller("trim")
export class TrimController {
	constructor(
		private readonly httpService: HttpService,
		private readonly trimService: TrimService
	) {}

	@UseGuards(JwtGuard)
	@Post("")
	@ApiOperation({
		summary: "사용자 차종 저장 API",
		description: "사용자가 소유한 자동차 정보 및 타이어 정보를 저장합니다."
	})
	async userTrim(@Body() saveUserTrimDto: SaveUserTrimDto) {
		const url = process.env.TRIM_API + saveUserTrimDto.trimId;
		const res = await lastValueFrom(this.httpService.get(url));

		return this.trimService.saveUserTrim(
			saveUserTrimDto,
			res.data.spec.driving
		);
	}
}
