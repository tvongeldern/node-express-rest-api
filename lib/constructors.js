const parsers = {
	get: function ParseGET({ request, reference }) {
		const handlerInputs = { data: request.query || {} };
		if (reference) {
			// Some GET requests will have params, others won't
			const referenceName = getReferenceName(reference);
			handlerInputs[referenceName] = request.params[referenceName];
		}
		return Promise.resolve(handlerInputs);
	},
	post: function ParsePOST({ request }) {
		return Promise.resolve({
			data: request.body || {},
		});
	},
	put: function ParsePUT({ request, reference }) {
		return Promise.resolve({
			data: request.body || {},
			reference: request.params.reference,
		});
	},
	delete: function ParseDELETE({ request, reference }) {
		return Promise.resolve({
			reference: request.params.reference,
		});
	},
};

function getReferenceName(reference) {
	if (reference && typeof reference === 'string') {
		return reference;
	}
	return 'reference';
}

const defaultError = { message: 'An issue occurred.', status: 500 };

function errorHandler({ error = defaultError, response, name = '[Anonymous]' }) {
	console.error(`\nAPI ERROR: ${name}`);
	console.error(error);
	response
		.status(error.status || 500)
		.send(error)
		.json();
}

function successHandler({ success, response }) {
	if (!success) {
		// If no content, defaults to 204 (No-Content)
		return response.status(204).send();
	}
	if (!success.status) {
		// This sends a 200
		return response.send(success);
	}
	// If status is specified, it removes the status code from the response JSON before sending
	const { status } = success;
	delete success.status;
	return response.status(status).send(success);
}

export function Endpoint({ method, handler, reference, name }) {
	if (typeof name !== 'string') {
		throw new Error('Attempting to mount unnamed endpoint');
	}
	if (typeof handler !== 'function') {
		throw new Error(`Endpoint ${name} was not provided with a proper handler.`);
	}
	this.method = method.toLowerCase();
	this.reference = reference || ['put', 'delete'].includes(this.method);
	const requestParser = parsers[this.method];
	if (typeof requestParser !== 'function') {
		throw new Error(`Endpoint ${name} was not provided with a proper method.`);
	}
	this.handler = function endpointRequestHandler(request, response) {
		return requestParser({ request, reference })
			.then(handler)
			.then((success) => successHandler({ success, response }))
			.catch((error) => errorHandler({ error, response, name }));
	};
	if (typeof this.handler !== 'function') {
		throw new Error(`Endpoint ${name} did not mount properly`);
	} else {
		console.log(`Endpoint ${name} successfully mounted`);
	}
}
