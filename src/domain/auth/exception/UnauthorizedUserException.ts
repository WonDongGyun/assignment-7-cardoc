import { HttpException } from "@nestjs/common";
import { ErrorCode } from "src/global/common/errorCode";

export class UnauthorizedUserException extends HttpException {
	constructor() {
		super(
			ErrorCode.Unauthorized.Message,
			ErrorCode.Unauthorized.StatusCode
		);
	}
}