import { Test, TestingModule } from "@nestjs/testing";
import { TrimService } from "./trim.service";

describe("TrimService", () => {
	let service: TrimService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TrimService]
		}).compile();

		service = module.get<TrimService>(TrimService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
