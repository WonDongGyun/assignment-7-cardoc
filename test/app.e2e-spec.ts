import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { getConnection } from "typeorm";
import { TrimOverlapException } from "src/domain/trim/exception/TrimOverlapException";
import { UserOverlapException } from "src/domain/user/exception/UserOverlapException";
import { NotFoundUserTrimException } from "src/domain/trim/exception/NotFoundUserTrimException";

describe("AppController (e2e)", () => {
	let app: INestApplication;
	let token;

	beforeEach(async () => {
		jest.setTimeout(30000);
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await getConnection().close();
	});

	it("/user/signup (Post)", () => {
		try {
			return request(app.getHttpServer()).post("/user/signup").send({
				id: "testid",
				password: "testPw"
			});
		} catch (e) {
			expect(e).toEqual(UserOverlapException);
		}
	});

	it("/user/signin (Post)", () => {
		return request(app.getHttpServer())
			.post("/user/signin")
			.send({
				id: "testid",
				password: "testPw"
			})
			.expect(200)
			.expect((res) => {
				token = res.body.token;
				expect(typeof token).toBe("string");
			});
	});

	it("/trim (Post)", () => {
		try {
			return request(app.getHttpServer())
				.post("/trim")
				.send([
					{
						id: "testid",
						trimId: 5000
					}
				])
				.expect(200)
				.expect((res) => {
					expect(typeof res.body).toBe("object");
				});
		} catch (e) {
			expect(e).toEqual(TrimOverlapException);
		}
	});

	it("/tire (Get)", () => {
		try {
			return request(app.getHttpServer())
				.get("/tire?trimId=5000")
				.set("Authorization", `Bearer ${token}`)
				.expect(200)
				.expect((res) => {
					expect(typeof res.body).toBe("object");
					expect(res.body).toHaveLength(2);
				});
		} catch (e) {
			expect(e).toEqual(NotFoundUserTrimException);
		}
	});
});
