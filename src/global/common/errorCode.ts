import { HttpStatus } from "@nestjs/common";

export class ErrorCode {
	static readonly UserOverlap = new ErrorCode(
		HttpStatus.INTERNAL_SERVER_ERROR,
		"이미 존재하는 사용자입니다."
	);
	static readonly UnauthorizedUser = new ErrorCode(
		HttpStatus.UNAUTHORIZED,
		"인증되지 않은 사용자입니다."
	);
	static readonly NotFoundUser = new ErrorCode(
		HttpStatus.INTERNAL_SERVER_ERROR,
		"사용자를 찾을 수 없습니다."
	);
	static readonly NotFoundUserTrim = new ErrorCode(
		HttpStatus.INTERNAL_SERVER_ERROR,
		"사용자에게 해당 차종이 등록되어 있지 않습니다."
	);
	static readonly TrimOverlap = new ErrorCode(
		HttpStatus.INTERNAL_SERVER_ERROR,
		"사용자가 이미 등록한 차종입니다."
	);

	static readonly DifferentType = new ErrorCode(
		HttpStatus.INTERNAL_SERVER_ERROR,
		"잘못된 형식의 요청입니다. 다시 확인해주세요."
	);

	static readonly TypeLength = new ErrorCode(
		HttpStatus.INTERNAL_SERVER_ERROR,
		"요청은 최소 하나 이상, 최대 5개 이하여야 합니다."
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
