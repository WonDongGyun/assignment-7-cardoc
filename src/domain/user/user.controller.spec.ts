import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../auth/auth.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import * as bcrypt from "bcrypt";
import { User } from "../entity/user.entity";
import { UserOverlapException } from "./exception/UserOverlapException";

const mockUserService = {
	createUser: jest.fn()
};

const mockAuthService = {
	makeToken: jest.fn()
};

describe("UserController", () => {
	let controller: UserController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				{
					provide: UserService,
					useValue: mockUserService
				},

				{
					provide: AuthService,
					useValue: mockAuthService
				}
			]
		}).compile();

		controller = module.get<UserController>(UserController);
	});

	describe("회원가입", () => {
		it("회원가입 성공", async () => {
			// given
			const user = new CreateUserDto();
			user.id = "test";
			user.password = "asdf1234!";
			mockUserService.createUser.mockResolvedValue(user);

			// when
			const res = await controller.createUser(user);

			// then
			expect(mockUserService.createUser).toHaveBeenCalledTimes(1);
			expect(mockUserService.createUser).toHaveBeenCalledWith(user);
			expect(res).toHaveProperty("id");
			expect(res).toHaveProperty("password");
		});

		it("회원가입 실패", async () => {
			// given
			const user = new CreateUserDto();
			user.id = "test";
			user.password = "asdf1234!";
			mockUserService.createUser.mockResolvedValue(UserOverlapException);

			// when
			try {
				await controller.createUser(user);
			} catch (e) {
				// then
				expect(e).toEqual(UserOverlapException);
			}
		});
	});

	describe("로그인", () => {
		it("로그인 성공, 토큰 발급", async () => {
			// given
			const user = new User();
			user.id = "test";
			user.password = await bcrypt.hash("asdf1234!", 10);
			user.createdAt = new Date();
			user.updatedAt = new Date();

			const token = "tokentokentoken";
			mockAuthService.makeToken.mockResolvedValue(token);

			// when
			const res = await controller.login(user);

			// then
			expect(mockAuthService.makeToken).toHaveBeenCalledTimes(1);
			expect(mockAuthService.makeToken).toHaveBeenCalledWith(user);
			expect(res).toHaveProperty("token");
		});
	});
});
