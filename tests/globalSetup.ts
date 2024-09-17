import config from './utils/config';
import * as DBManager from './utils/DBManager';

/*
 This code is inspired from https://typegoose.github.io/mongodb-memory-server/docs/guides/integration-examples/test-runners
 If this code is broken, please refer to the link above
*/

export = async function globalSetup() {
	// Config to decide if an mongodb-memory-server instance should be used
	if (config.Memory) {
		// it's needed in global space, because we don't want to create a new instance every test-suite, thus preventing race conditions
		const instance = await DBManager.memoryServer;
		(global as any).__MONGOINSTANCE = instance;

		const uri = instance.getUri();

		// Set the DB_URL to the memory server uri
		// TODO: Figure out wether to use DB_URL or MONGO_URI, see https://typegoose.github.io/mongodb-memory-server/docs/guides/integration-examples/test-runners
		process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));

		console.log('mongo memory server uri: ', uri);
	} else {
		process.env.MONGO_URI = `mongodb://${process.env.HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}`;
	}

	// The following is to make sure the database is clean before a test suite starts
	DBManager.disconnect();
};
