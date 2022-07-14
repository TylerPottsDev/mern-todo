import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { apiRouter } from './routes';

const port = 3001;
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/react-todo').then(() => {
	console.log("Connected to MongoDB");

	app.use('/api', apiRouter);

	app.listen(port, () => {
		console.log(`Started on ${port}`);
	});
}).catch(console.error);