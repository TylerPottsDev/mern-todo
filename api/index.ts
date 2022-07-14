import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { apiRouter } from './routes';
import { AwsSecretManager } from './lib/aws/secret-manager';



AwsSecretManager.attachToProcessEnv('MernProd').then(() => {
	const port = 3001;
	const app = express();

	app.use(express.json());
	app.use(cors());

	mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mern-db-cluster.cluster-cmsh7c30416b.us-east-1.docdb.amazonaws.com:27017/mern-todo?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`, {
		tlsCAFile: 'rds-combined-ca-bundle.pem'
	}).then(() => {

		console.log("Connected to MongoDB", new Date());

		app.use('/api', apiRouter);

		app.get('/stress', (req, res) => {
			res.status(200).send('OK');
		});

		app.get('/health-check', (req, res) => {
			res.status(200).send('OK');
		});

		app.listen(port, () => {
			console.log(`Started on ${port}`);
		});
	}).catch(console.error);
});