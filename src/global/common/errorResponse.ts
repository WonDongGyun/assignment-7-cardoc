import { CommonResponse } from "./commonResponse";
import { ErrorCode } from "./errorCode";

export class ErrorResponse extends CommonResponse {
	constructor(errorCode: ErrorCode) {
		super();
		this.statusCode = errorCode.StatusCode;
		this.message = errorCode.Message;
	}

	public static response(errorCode: ErrorCode) {
		return new ErrorResponse(errorCode);
	}
}
