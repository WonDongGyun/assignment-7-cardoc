import { HttpException } from "@nestjs/common";
import { ErrorCode } from "src/global/common/errorCode";

export class TrimOverlapException extends HttpException {
	constructor() {
		super(ErrorCode.TrimOverlap.Message, ErrorCode.TrimOverlap.StatusCode);
	}
}
