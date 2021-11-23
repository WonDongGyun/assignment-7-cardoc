import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setSwagger(app: INestApplication): void {
	const config = new DocumentBuilder()
		.setTitle("CarDoc API Docs")
		.setDescription("카닥 과제 API 문서입니다.")
		.setVersion("1.0")
		.addTag("CarDoc")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);
}
