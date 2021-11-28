import { Test, TestingModule } from "@nestjs/testing";
import { Trim } from "../entity/trim.entity";
import { User } from "../entity/user.entity";
import { TireRepository } from "../tier/tire.repository";
import { UserRepository } from "../user/user.repository";
import { SaveUserTrimDto } from "./dto/saveUserTrim.dto";
import { TrimRepository } from "./trim.repository";
import { TrimService } from "./trim.service";
import { mocked } from "ts-jest/utils";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tire } from "../entity/tire.entity";
import { Code, getConnection } from "typeorm";

const mockUserRepository = {
	findUser: jest.fn()
};

const mockTrimRepository = {
	saveUserTrim: jest.fn()
};

const mockTireRepository = {
	saveTrimTire: jest.fn()
};

// const typeorm = {
// 	getConnection: jest.fn(),
// 	createQueryRunner: jest.fn(),
// 	startTransaction: jest.fn()
// };
// jest.mock("typeorm");
// const mockedGetConnection = mocked(getConnection, true).mockImplementation(
// 	() =>
// 		({
// 			isConnected: true
// 		} as Connection)
// );

describe("TrimService", () => {
	let service: TrimService;

	beforeEach(async () => {
		jest.setTimeout(30000);
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				ConfigModule.forRoot({
					isGlobal: true
				}),
				TypeOrmModule.forRoot({
					type: "mysql",
					host: process.env.DB_HOST,
					port: 3306,
					username: process.env.DB_USER,
					password: process.env.DB_PASSWORD,
					database: process.env.DB_DATABASE,
					entities: [User, Trim, Tire, Code],
					synchronize: true
				})
			],
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

	afterAll(async () => {
		await getConnection().close();
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
			expect(res.trimId).toEqual(5000);
		});
	});
});
