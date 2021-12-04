import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ExceptionHandler } from "./global/exceptionHandler/exceptionHandler";
import { morganLogging } from "./global/log/moranLogging";
import { winstonOptions } from "./global/log/winston";
import { setSwagger } from "./global/swagger/setSwagger";

async function bootstrap() {
	const logger = new Logger();
	const app = await NestFactory.create(AppModule, winstonOptions);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true
		})
	);
	app.useGlobalFilters(new ExceptionHandler(logger));
	setSwagger(app);
	morganLogging(app);
	await app.listen(3000);
	Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
