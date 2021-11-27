import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserOverlapException } from "./exception/UserOverlapException";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

const mockUserRepository = {
	findUser: jest.fn(),
	createUser: jest.fn()
};

describe("UserService", () => {
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: UserRepository,
					useValue: mockUserRepository
				}
			]
		}).compile();

		service = module.get<UserService>(UserService);
	});

	describe("사용자 생성", () => {
		it("사용자 생성 성공", async () => {
			// given
			const user = new CreateUserDto();
			user.id = "test";
			user.password = "asdf1234!";
			mockUserRepository.createUser.mockResolvedValue(user);

			// when
			const res = await service.createUser(user);

			// then
			expect(mockUserRepository.createUser).toHaveBeenCalledTimes(1);
			expect(mockUserRepository.createUser).toHaveBeenCalledWith(user);
			expect(res).toHaveProperty("id");
			expect(res).toHaveProperty("password");
		});

		it("사용자 생성 실패", async () => {
			// given
			const user = new CreateUserDto();
			user.id = "test";
			user.password = "asdf1234!";
			mockUserRepository.createUser.mockResolvedValue(
				UserOverlapException
			);

			// when
			try {
				await service.createUser(user);
			} catch (e) {
				// then
				expect(e).toEqual(UserOverlapException);
			}
		});
	});
});
