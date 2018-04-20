// Dependencies
import urlSlug from 'url-slug';
import express from 'express';
import bodyParser from 'body-parser';

import { Endpoint } from 'constructors';
import * as endpointsModule from 'endpoints';
import packageJson from './package';

// Declaring constants
const PORT = 3000;
const apiVersion = packageJson.version
	.split('.')
	.slice(0, -1)
	.join('.');
const endpointGroups = Object.keys(endpointsModule);

// Express setup
const app = express();
app.use(bodyParser.json());

// Mounting endpoints
console.log('\nMOUNTING ENDPOINTS...\n');

function getReferenceName(endpoint) {
	const { reference, method } = endpoint;
	if (['put', 'delete'].includes(method)) {
		// Defaults to 'reference' for puts and deletes, since they always have a param
		return `/:${reference || 'reference'}`;
	}
	if (reference && typeof reference === 'string') {
		// sets named param
		return `/:${reference}`;
	}
	if (reference) {
		// Defaults to 'reference' if reference is true but not a string
		return '/:reference';
	}
	return '';
}

// Mounts endpoints to URLs based on convention {api version}/{endpoint group}/{endpoint name}/{param if applicable}
endpointGroups.forEach((endpointGroupName) => {
	const endpoints = endpointsModule[endpointGroupName];
	const endpointNames = Object.keys(endpoints);
	endpointNames.forEach((endpointName) => {
		const name = `${urlSlug(endpointGroupName)}/${urlSlug(endpointName)}`;
		const endpointModule = endpoints[endpointName];
		const endpoint = new Endpoint({ ...endpointModule, name });
		app[endpoint.method](`/${apiVersion}/${name}${getReferenceName(endpoint)}`, endpoint.handler);
	});
});

// Starting API
app.listen(PORT, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log(`\nAPI version ${apiVersion} started on port ${PORT}\n`);
});
