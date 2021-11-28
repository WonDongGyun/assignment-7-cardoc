import { HttpException } from "@nestjs/common";
import { ErrorCode } from "src/global/common/errorCode";

export class TypeLengthException extends HttpException {
	constructor() {
		super(ErrorCode.TypeLength.Message, ErrorCode.TypeLength.StatusCode);
	}
}
