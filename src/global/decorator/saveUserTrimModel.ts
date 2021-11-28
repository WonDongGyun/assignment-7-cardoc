import {
	createParamDecorator,
	ExecutionContext,
	UseFilters
} from "@nestjs/common";
import { SaveUserTrimDto } from "src/domain/trim/dto/saveUserTrim.dto";
import { DifferentTypeException } from "src/domain/trim/exception/DifferentTypeException";
import { TypeLengthException } from "src/domain/trim/exception/TypeLengthException";

export const saveUserTrimModel = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest().body;

		if (request.length > 5 || request.length < 1) {
			throw new TypeLengthException();
		}

		try {
			return request.map((element) => {
				const dto = new SaveUserTrimDto();
				dto.id = element.id;
				dto.trimId = element.trimId;
				return dto;
			});
		} catch (e) {
			throw new DifferentTypeException();
		}
	}
);
