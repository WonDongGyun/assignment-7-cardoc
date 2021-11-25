import { Module } from "@nestjs/common";
import { TrimController } from "./trim.controller";
import { TrimService } from "./trim.service";

@Module({
	controllers: [TrimController],
	providers: [TrimService]
})
export class TrimModule {}
