import supertest from "supertest";
import app from "../src/app";

const request = supertest(app);

describe("Authentication API", () => {
	const testUser = {
		username: "testuser",
		password: "password",
		email: "test@test.com",
	};

	const baseRoute = "/api/v1/auth";

	describe(`POST ${baseRoute}/register`, () => {
		it("should return 400 if email is missing", async () => {
			const testData = {
				username: testUser.username,
				password: testUser.password,
			}

			const response = await request
				.post(`${baseRoute}/register`)
				.send(testData);

			expect(response.status).toBe(400);
			expect(response.body.message).toBe(
				"Missing email, password or username fields. Check if you have any typos"
			);
		});

		it("should return 400 if username is missing", async () => {
			const response = await request.post(`${baseRoute}/register`).send({
				email: testUser.email,
				password: testUser.password,
			});

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("message");
		});

		it("should return 400 if password is missing", async () => {
			const response = await request.post(`${baseRoute}/register`).send({
				email: testUser.email,
				username: testUser.username,
			});

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("message");
		});

		it("should return 201 if user is created successfully", async () => {
			const response = await request
				.post(`${baseRoute}/register`)
				.send(testUser);

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("message");
		});

		it("should return 400 if user already exists", async () => {
			const response = await request
				.post(`${baseRoute}/register`)
				.send(testUser);

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("message");
		});
	});

	describe(`POST ${baseRoute}/login`, () => {
		async function requestPostLogin(body: object) {
			const response = await request
				.post(`${baseRoute}/login`)
				.send(body);

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("message");
		}

		it("should return 400 if email is missing", async () => {
			requestPostLogin({
				username: 'testuser',
				password: testUser.password,
			});
		});

		it("should return 400 if password is missing", async () => {
			requestPostLogin({
				email: 'test@test.com',
				username: testUser.username,
			});
		});

		it("should return 400 if username is missing", async () => {
			requestPostLogin({
				username: 'testuser',
				email: testUser.email,
			});
		});
	})
});
