export const urlObject = {
	scheme: process.env.HTTP || 'http',// todo: add https
	host: process.env.HOST || 'localhost',
	port: process.env.PORT || 5000,
};