import { Test, TestingModule } from "@nestjs/testing";
import { TireRepository } from "./tire.repository";
import { TireService } from "./tire.service";

const mockTireRepository = {
	findTrimTire: jest.fn()
};

describe("TierService", () => {
	let service: TireService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TireService,
				{
					provide: TireRepository,
					useValue: mockTireRepository
				}
			]
		}).compile();

		service = module.get<TireService>(TireService);
	});

	describe("사용자 차종의 타이어 조회", () => {
		it("사용자 차종의 타이어 조회 성공", async () => {
			// given

			const authUser = {
				id: "testid"
			};
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

			mockTireRepository.findTrimTire.mockResolvedValue(tire);

			// when
			const res = await service.findTrimTire(authUser, trimId);

			// // then
			expect(mockTireRepository.findTrimTire).toHaveBeenCalledTimes(1);
			expect(mockTireRepository.findTrimTire).toHaveBeenCalledWith(
				authUser,
				trimId
			);
			expect(res).toEqual(tire);
		});
	});
});
