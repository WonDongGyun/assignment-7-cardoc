import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { UnauthorizedUserException } from "src/domain/auth/exception/UnauthorizedUserException";
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
				.json(ErrorResponse.response(ErrorCode.Unauthorized));
		} else if (exception instanceof NotFoundUserException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.NotFoundUser));
		} else {
			const status = exception.getStatus();
			response.status(status).json({
				statusCode: status
			});
		}
	}
}