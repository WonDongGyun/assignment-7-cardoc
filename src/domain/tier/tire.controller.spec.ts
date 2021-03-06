import { Test, TestingModule } from "@nestjs/testing";
import { User } from "../entity/user.entity";
import { NotFoundUserTrimException } from "../trim/exception/NotFoundUserTrimException";
import { TireController } from "./tire.controller";
import { TireService } from "./tire.service";

const mockTireService = {
	findTrimTire: jest.fn()
};

describe("TireController", () => {
	let controller: TireController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TireController],
			providers: [
				{
					provide: TireService,
					useValue: mockTireService
				}
			]
		}).compile();

		controller = module.get<TireController>(TireController);
	});

	describe("사용자 차종의 타이어 조회 API", () => {
		it("사용자 차종의 타이어 조회 API 성공", async () => {
			// given
			const user = new User();
			user.id = "testid";
			const trimId = 5000;
			const tire = [
				{
					unit: "",
					multiValues: "",
					value: "225/60R16",
					TireLoc: "타이어 전"
				},
				{
					unit: "",
					multiValues: "",
					value: "225/60R16",
					TireLoc: "타이어 후"
				}
			];

			mockTireService.findTrimTire.mockResolvedValue(tire);

			// when
			const res = await controller.getTrimTire(user, trimId);

			// // then
			expect(mockTireService.findTrimTire).toHaveBeenCalledTimes(1);
			expect(mockTireService.findTrimTire).toHaveBeenCalledWith(
				user.id,
				trimId
			);
			expect(res).toEqual(tire);
		});
		it("사용자 차종의 타이어 조회 API 실패", async () => {
			// given
			const user = new User();
			user.id = "testid";
			const trimId = 5001;

			mockTireService.findTrimTire.mockResolvedValue(
				NotFoundUserTrimException
			);

			// when
			try {
				await controller.getTrimTire(user, trimId);
			} catch (e) {
				// // then
				expect(e).toEqual(NotFoundUserTrimException);
			}
		});
	});
});
