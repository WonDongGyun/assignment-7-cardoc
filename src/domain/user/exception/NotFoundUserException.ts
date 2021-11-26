import { HttpException } from "@nestjs/common";
import { ErrorCode } from "src/global/common/errorCode";

export class NotFoundUserException extends HttpException {
	constructor() {
		super(
			ErrorCode.NotFoundUser.Message,
			ErrorCode.NotFoundUser.StatusCode
		);
	}
}
