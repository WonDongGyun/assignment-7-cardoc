import * as winston from "winston";
import { utilities, WinstonModule } from "nest-winston";
import * as path from "path";

export const winstonOptions = {
	logger: WinstonModule.createLogger({
		transports: [
			new winston.transports.Console({
				format: winston.format.combine(
					winston.format.timestamp(),
					winston.format.ms(),
					utilities.format.nestLike("Cardoc", {
						prettyPrint: true
					})
				)
			}),

			new winston.transports.File({
				dirname: "dailyLog",
				filename:
					"logs/Errors-" +
					new Date(Date.now()).toDateString() +
					".log",
				level: "error",
				maxFiles: 30
			})
		],
		format: winston.format.combine(
			winston.format.timestamp({
				format: "YYYY-MM-DD HH:mm:ss"
			}),
			winston.format.ms(),
			winston.format.printf(
				(error) =>
					`${error.level}: ${[error.timestamp]}: ${error.message}: ${
						error.ms
					}`
			)
		)
	})
};
