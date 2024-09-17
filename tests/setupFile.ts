import * as DBMananger from './utils/DBManager';

beforeAll(async () => {
	// put your client connection code here:
	await DBMananger.connect();
});

afterAll(async () => {
	// put your client disconnection code here:
	await DBMananger.disconnect();
});