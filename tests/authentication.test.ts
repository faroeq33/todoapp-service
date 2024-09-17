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
		it("should return 400 if email, password, or username is missing", async () => {
			const response = await request.post(`${baseRoute}/register`).send({
				username: testUser.username,
				password: testUser.password,
			});

			expect(response.status).toBe(400);
			expect(response.body.message).toBe(
				"Missing email, password or username fields. Check if you have any typos"
			);
		});

		it("should return 201 if user is created successfully", async () => {
			const response = await request
				.post(`${baseRoute}/register`)
				.send(testUser);

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("message");
		});
	});
});
