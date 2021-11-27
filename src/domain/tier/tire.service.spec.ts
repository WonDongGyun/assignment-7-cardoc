import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundUserTrimException } from "../trim/exception/NotFoundUserTrimException";
import { TrimRepository } from "../trim/trim.repository";
import { TireRepository } from "./tire.repository";
import { TireService } from "./tire.service";

const mockTireRepository = {
	findTrimTire: jest.fn()
};

const mockTrimRepository = {
	findUserTrim: jest.fn()
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
				},
				{
					provide: TrimRepository,
					useValue: mockTrimRepository
				}
			]
		}).compile();

		service = module.get<TireService>(TireService);
	});

	describe("사용자 차종의 타이어 조회", () => {
		it("사용자 차종의 타이어 조회 성공", async () => {
			// given
			const userId = "testid";
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
			mockTrimRepository.findUserTrim.mockResolvedValue(null);

			// when
			const res = await service.findTrimTire(userId, trimId);

			// // then
			expect(mockTireRepository.findTrimTire).toHaveBeenCalledTimes(1);
			expect(mockTireRepository.findTrimTire).toHaveBeenCalledWith(
				userId,
				trimId
			);
			expect(mockTrimRepository.findUserTrim).toHaveBeenCalledTimes(1);
			expect(mockTrimRepository.findUserTrim).toHaveBeenCalledWith(
				userId,
				trimId
			);
			expect(res).toEqual(tire);
		});

		it("사용자 차종의 타이어 조회 실패", async () => {
			// given
			const userId = "testid";
			const trimId = 5001;

			mockTrimRepository.findUserTrim.mockResolvedValue(
				NotFoundUserTrimException
			);

			// when
			try {
				await service.findTrimTire(userId, trimId);
			} catch (e) {
				// then
				expect(e).toEqual(NotFoundUserTrimException);
			}
		});
	});
});
