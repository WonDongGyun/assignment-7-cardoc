import { HttpStatus } from "@nestjs/common";

export class ErrorCode {
	static readonly UserOverlap = new ErrorCode(
		HttpStatus.INTERNAL_SERVER_ERROR,
		"이미 존재하는 사용자입니다."
	);
	static readonly Unauthorized = new ErrorCode(
		HttpStatus.UNAUTHORIZED,
		"인증되지 않은 사용자입니다."
	);

	constructor(
		private readonly statusCode: number,
		public readonly message: string
	) {}

	get StatusCode(): number {
		return this.statusCode;
	}

	get Message(): string {
		return this.message;
	}
}
