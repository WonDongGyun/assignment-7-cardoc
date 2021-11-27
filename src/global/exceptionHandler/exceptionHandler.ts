import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { UnauthorizedUserException } from "src/domain/auth/exception/UnauthorizedUserException";
import { NotFoundUserTrimException } from "src/domain/trim/exception/NotFoundUserTrimException";
import { NotFoundUserException } from "src/domain/user/exception/NotFoundUserException";
import { UserOverlapException } from "src/domain/user/exception/UserOverlapException";
import { ErrorCode } from "../common/errorCode";
import { ErrorResponse } from "../common/errorResponse";

export class ExceptionHandler implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		if (exception instanceof UserOverlapException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.UserOverlap));
		} else if (exception instanceof UnauthorizedUserException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.UnauthorizedUser));
		} else if (exception instanceof NotFoundUserException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.NotFoundUser));
		} else if (exception instanceof NotFoundUserTrimException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.NotFoundUserTrim));
		} else {
			const status = exception.getStatus();
			response.status(status).json({
				statusCode: status
			});
		}
	}
}
