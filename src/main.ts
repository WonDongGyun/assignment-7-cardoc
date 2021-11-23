import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { morganLogging } from "./global/log/moranLogging";
import { setSwagger } from "./global/swagger/setSwagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true
		})
	);

	setSwagger(app);
	morganLogging(app);
	await app.listen(3000);
	Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
