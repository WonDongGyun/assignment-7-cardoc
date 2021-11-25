import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCode } from "src/global/common/errorCode";

export class UserOverlapException extends HttpException {
	constructor() {
		super(ErrorCode.UserOverlap.Message, ErrorCode.UserOverlap.StatusCode);
	}
}
