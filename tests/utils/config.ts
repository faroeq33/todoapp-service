// this file could be anything (like a json directly imported)

export default {
	Memory: true,
	IP: process.env.HOST || 'localhost',
	Port: process.env.MONGO_PORT || 27017,
	Database: 'testdb'
};