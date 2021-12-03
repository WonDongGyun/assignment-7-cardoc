import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	HttpCode,
	Post,
	UseGuards,
	UseInterceptors
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { AuthUser } from "src/global/decorator/authUser.decorator";
import { AuthService } from "../auth/auth.service";
import { LocalAuthGuard } from "../auth/guard/localAuth.guard";
import { User } from "../entity/user.entity";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
	constructor(
		private readonly userService: UserService,
		private authService: AuthService
	) {}

	@Post("signup")
	@HttpCode(200)
	@ApiOperation({
		summary: "회원가입 API",
		description: "사용자를 생성합니다."
	})
	async createUser(@Body() createUserDto: CreateUserDto) {
		return await this.userService.createUser(createUserDto);
	}

	@UseGuards(LocalAuthGuard)
	@Post("signin")
	@HttpCode(200)
	@ApiOperation({
		summary: "로그인 API",
		description: "로그인시 토큰을 반환합니다."
	})
	async login(@AuthUser() user: User) {
		return { token: this.authService.makeToken(user) };
	}
}
