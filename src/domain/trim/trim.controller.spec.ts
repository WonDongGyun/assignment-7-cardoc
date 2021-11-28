import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { Trim } from "../entity/trim.entity";
import { SaveUserTrimDto } from "./dto/saveUserTrim.dto";
import { TrimController } from "./trim.controller";
import { TrimService } from "./trim.service";

const mockTrimService = {
	saveUserTrim: jest.fn()
};

describe("TrimController", () => {
	let controller: TrimController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				ConfigModule.forRoot({
					isGlobal: true
				}),
				HttpModule
			],
			controllers: [TrimController],
			providers: [
				{
					provide: TrimService,
					useValue: mockTrimService
				}
			]
		}).compile();

		controller = module.get<TrimController>(TrimController);
	});

	describe("외부 API 사용", () => {
		it("외부 API 사용하여 차종 정보 및 타이어 정보 저장", async () => {
			// given
			const dtoArr: SaveUserTrimDto[] = [];
			const dto = new SaveUserTrimDto();
			dto.id = "testid";
			dto.trimId = 5000;
			dtoArr.push(dto);

			const trim = new Trim();
			trim.trimId = 5000;

			mockTrimService.saveUserTrim.mockResolvedValue(trim);

			// when
			const res = await controller.userTrim(dtoArr);

			// // then
			expect(mockTrimService.saveUserTrim).toHaveBeenCalledTimes(1);
			expect(res[0].trimId).toEqual(5000);
		});
	});
});
