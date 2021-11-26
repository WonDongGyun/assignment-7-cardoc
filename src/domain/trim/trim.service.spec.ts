import { Test, TestingModule } from "@nestjs/testing";
import { Tire } from "../entity/tire.entity";
import { Trim } from "../entity/trim.entity";
import { User } from "../entity/user.entity";
import { TireRepository } from "../tier/tire.repository";
import { UserRepository } from "../user/user.repository";
import { SaveUserTrimDto } from "./dto/saveUserTrim.dto";
import { TrimRepository } from "./trim.repository";
import { TrimService } from "./trim.service";

const mockUserRepository = {
	findUser: jest.fn()
};

const mockTrimRepository = {
	saveUserTrim: jest.fn()
};

const mockTireRepository = {
	saveTrimTire: jest.fn()
};

describe("TrimService", () => {
	let service: TrimService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TrimService,
				{
					provide: TrimRepository,
					useValue: mockTrimRepository
				},
				{
					provide: TireRepository,
					useValue: mockTireRepository
				},
				{
					provide: UserRepository,
					useValue: mockUserRepository
				}
			]
		}).compile();

		service = module.get<TrimService>(TrimService);
	});

	describe("사용자 차종 및 타이어 정보 저장", () => {
		it("사용자 차종 및 타이어 정보 저장 성공", async () => {
			// given
			const dto = new SaveUserTrimDto();
			dto.id = "testid";
			dto.trimId = 5000;

			const api = {
				frontTire: {
					name: "타이어 전",
					value: "225/60R16",
					unit: "",
					multiValues: ""
				},
				rearTire: {
					name: "타이어 후",
					value: "225/60R16",
					unit: "",
					multiValues: ""
				}
			};

			const user = new User();
			user.id = "testid";

			const trim = new Trim();
			trim.trimId = 5000;

			mockUserRepository.findUser.mockResolvedValue(user);
			mockTrimRepository.saveUserTrim.mockResolvedValue(trim);
			mockTireRepository.saveTrimTire.mockResolvedValue(null);

			// when
			const res = await service.saveUserTrim(dto, api);

			// then
			expect(mockUserRepository.findUser).toHaveBeenCalledTimes(1);
			expect(mockTrimRepository.saveUserTrim).toHaveBeenCalledTimes(1);
			expect(mockTireRepository.saveTrimTire).toHaveBeenCalledTimes(1);
			expect(mockUserRepository.findUser).toHaveBeenCalledWith(dto.id);
			expect(mockTrimRepository.saveUserTrim).toHaveBeenCalledWith(
				user,
				dto.trimId
			);
			expect(mockTireRepository.saveTrimTire).toHaveBeenCalledWith(
				trim,
				api
			);
			expect(res.trimId).toEqual(5000);
		});
	});
});
