export const urlObject = {
	scheme: process.env.HTTPS ? 'https' : 'http',
	host: process.env.HOST || 'localhost',
	port: process.env.PORT || 5000,
};