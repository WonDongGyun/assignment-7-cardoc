import { INestApplication, Logger } from "@nestjs/common";
import * as morgan from "morgan";

export function morganLogging(app: INestApplication) {
	const logger = new Logger("Request");
	app.use(
		morgan("combined", {
			stream: {
				write: (message) => logger.log(message.replace("\n", ""))
			}
		})
	);
}
