import { HttpException } from "@nestjs/common";
import { ErrorCode } from "src/global/common/errorCode";

export class NotFoundUserTrimException extends HttpException {
	constructor() {
		super(
			ErrorCode.NotFoundUserTrim.Message,
			ErrorCode.NotFoundUserTrim.StatusCode
		);
	}
}
