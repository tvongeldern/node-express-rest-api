// TOP-LEVEL IMPORTS
import urlSlug from 'url-slug';

// EXPRESS SETUP
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());

// IMPORTING ENDPOINTS
import { Endpoint } from 'constructors';
import * as endpointsModule from 'endpoints';

// DECLARING CONSTANTS
import packageJson from './package';
const PORT = 3000;
const apiVersion = packageJson.version
	.split('.')
	.slice(0, -1)
	.join('.');
const endpointGroups = Object.keys(endpointsModule);

// MOUNTING ENDPOINTS
console.log('\nMOUNTING ENDPOINTS...\n');

endpointGroups.forEach((endpointGroupName) => {
	const endpoints = endpointsModule[endpointGroupName];
	const endpointNames = Object.keys(endpoints);
	endpointNames.forEach((endpointName) => {
		const name = `${urlSlug(endpointGroupName)}/${urlSlug(endpointName)}`;
		const endpointModule = endpoints[endpointName];
		const endpoint = new Endpoint({ ...endpointModule, name });
		app[endpoint.method](`/${apiVersion}/${name}${endpoint.reference ? '/:reference' : ''}`, endpoint.handler);
	});
});

console.log('\nFinished mounting endpoints!\n');

// BOOTING API
app.listen(PORT, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log(`\nAPI version ${apiVersion} started on port ${PORT}\n`);
});
