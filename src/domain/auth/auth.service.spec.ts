import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { User } from "../entity/user.entity";
import { UserRepository } from "../user/user.repository";
import { AuthService } from "./auth.service";
import * as bcrypt from "bcrypt";

const mockUserRepository = {
	findUser: jest.fn()
};

const mockJwtService = {
	sign: jest.fn()
};

describe("AuthService", () => {
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: JwtService,
					useValue: mockJwtService
				},
				{
					provide: UserRepository,
					useValue: mockUserRepository
				}
			]
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	describe("검증", () => {
		it("사용자 비밀번호 bcrypt 검증", async () => {
			// given
			const user = new User();
			user.id = "test";
			user.password = await bcrypt.hash("asdf1234!", 10);

			mockUserRepository.findUser.mockResolvedValue(user);

			// when
			const res = await service.validateUser(user.id, "asdf1234!");

			// then
			expect(mockUserRepository.findUser).toHaveBeenCalledTimes(1);
			expect(mockUserRepository.findUser).toHaveBeenCalledWith(user.id);
			expect(res).toHaveProperty("id");
			expect(res).toHaveProperty("password");
		});
	});

	describe("토큰 생성", () => {
		it("토큰 생성", async () => {
			// given
			const user = new User();
			user.id = "test";
			user.password = await bcrypt.hash("asdf1234!", 10);

			const token = "tokentokentoken";
			const payload = { id: user.id };

			mockJwtService.sign.mockResolvedValue(token);

			// when
			const res = await service.makeToken(user);

			// then
			expect(mockJwtService.sign).toHaveBeenCalledTimes(1);
			expect(mockJwtService.sign).toHaveBeenCalledWith(payload);
			expect(res).toEqual(token);
		});
	});
});
