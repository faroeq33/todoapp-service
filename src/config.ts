import * as dotenv from 'dotenv'

dotenv.config()

import { z } from 'zod';

const EnvSchema = z
	.object({
		MONGO_USERNAME: z
			.string({
				description: 'The username to connect to the database',
				required_error: '😱 You forgot to add a database username',
			}),
		MONGO_PASSWORD: z
			.string({
				description: 'The password to connect to the database',
				required_error: '😱 You forgot to add a database password',
			}),
		SCHEME: z
			.enum(['http', 'https'], {
				description: 'The protocol to use for the server',
				required_error: '😱 You forgot to add a protocol',
			})
			.default('http'),
		NODE_ENV: z
			.enum(
				[
					'DEV',
					'TEST',
					'PRODUCTION',
				],
				{
					description: 'This gets updated depending on your environment',
				}
			)
			.default('DEV'),
		MONGO_PORT: z
			.string({
				description: 'The port to connect to the database',
				required_error: '😱 You forgot to add a database port',
			})
			.min(3),
		HOST: z
			.string({
				description: 'The host to bind the server to',
			})
			.default('localhost'),
		SERVER_PORT: z
			.coerce
			.number({
				description: '.env files convert numbers to strings, therefoore we have to enforce them to be numbers',
			})
			.positive()
			.max(65536, `options.port should be >= 0 and < 65536`)
			.default(5000),
	});

// This is the schema that we will use to validate the environment variables, we will use it to parse the process.env object
const env = EnvSchema.parse(process.env);

export const config = {
	...env,
	CONNECTIONSTRING: `mongodb://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${env.HOST}:${env.MONGO_PORT}`,
	SERVER_URL: `${env.SCHEME}://${env.HOST}:${env.SERVER_PORT}`
};

