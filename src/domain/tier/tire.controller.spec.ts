import { Test, TestingModule } from "@nestjs/testing";
import { TierController } from "./tire.controller";

describe("TierController", () => {
	let controller: TierController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TierController]
		}).compile();

		controller = module.get<TierController>(TierController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
