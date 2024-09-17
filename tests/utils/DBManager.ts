import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export const memoryServer = MongoMemoryServer.create();

export const connect = async () => {
	// TODO: connect with the memory server instance from global namespace, now it's referring to use the memoryServer variable
	const uri = await (await memoryServer).getUri();
	console.log("uri: ", uri)
	await mongoose.connect(uri);
}

export const disconnect = async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();

	const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;
	await instance.stop();
}

export const clearDatabase = async () => {
	const collections = mongoose.connection.collections;
	for (const key in collections) {
		const collection = collections[key];
		await collection.deleteMany({});
	}
}
