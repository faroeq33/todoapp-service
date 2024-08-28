import express from 'express';
import MessageResponse from '../interfaces/MessageResponse';

const router = express.Router();

router.get<object, MessageResponse>('/', (req, res) => {
	res.json({
		message: 'Welcome to the todoapp service',
	});
});

export default router;

