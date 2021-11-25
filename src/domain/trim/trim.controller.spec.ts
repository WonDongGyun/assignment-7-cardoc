import { Test, TestingModule } from "@nestjs/testing";
import { TrimController } from "./trim.controller";

describe("TrimController", () => {
	let controller: TrimController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TrimController]
		}).compile();

		controller = module.get<TrimController>(TrimController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
