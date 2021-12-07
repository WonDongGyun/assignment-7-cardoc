import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export const getOrmConfig = (): MysqlConnectionOptions => {
	console.log("hello");
	console.log(__dirname);
	console.log(`${__dirname}/**/*`);
	const config: MysqlConnectionOptions = {
		type: "mysql",
		host: process.env.DB_HOST,
		port: 3306,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		entities: [`${__dirname}/**/*.entity{.ts,.js}`],
		synchronize: false
	};
	return config;
};
