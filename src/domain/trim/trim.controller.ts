import { HttpService } from "@nestjs/axios";
import { Controller, HttpCode, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { lastValueFrom } from "rxjs";
import { saveUserTrimModel } from "src/global/decorator/saveUserTrimModel.decorator";
import { SaveUserTrimDto } from "./dto/saveUserTrim.dto";
import { TrimService } from "./trim.service";
@Controller("trim")
export class TrimController {
	constructor(
		private readonly httpService: HttpService,
		private readonly trimService: TrimService
	) {}

	@Post("")
	@HttpCode(200)
	@ApiOperation({
		summary: "사용자 차종 저장 API",
		description: "사용자가 소유한 자동차 정보 및 타이어 정보를 저장합니다."
	})
	async userTrim(
		@saveUserTrimModel()
		saveUserTrimDtoModel: SaveUserTrimDto[]
	) {
		const response = [];

		for (const saveUserTrimDto of saveUserTrimDtoModel) {
			const url = process.env.TRIM_API + saveUserTrimDto.trimId;
			const res = await lastValueFrom(this.httpService.get(url));
			response.push(
				await this.trimService.saveUserTrim(
					saveUserTrimDto,
					res.data.spec.driving
				)
			);
		}

		return response;
	}
}
