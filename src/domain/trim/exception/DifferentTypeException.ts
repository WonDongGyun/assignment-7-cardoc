import { HttpException } from "@nestjs/common";
import { ErrorCode } from "src/global/common/errorCode";

export class DifferentTypeException extends HttpException {
	constructor() {
		super(
			ErrorCode.DifferentType.Message,
			ErrorCode.DifferentType.StatusCode
		);
	}
}
