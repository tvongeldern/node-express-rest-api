const parsers = {
    get: function ParseGET({ request, reference }) {
        const handlerInputs = { data: request.query || {} };
        if (reference) {
            handlerInputs.reference = request.params.reference;
        }
        return Promise.resolve(handlerInputs);
    },
    post: function ParsePOST({ request }) {
        return Promise.resolve({
            data: request.body || {},
            reference: request.params.reference,
        });
    },
    put: function ParsePUT({ request }) {
        return Promise.resolve({
            data: request.body || {},
        });
    },
    delete: function ParseDELETE({ request }) {
        return Promise.resolve({
            reference: request.params.reference,
        });
    },
};

const defaultError = { message: 'An issue occurred.', status: 500 };

function errorHandler({ error = defaultError, response, name = '[Anonymous]' }) {
    console.error(`\nAPI ERROR: ${name}`);
    console.error(error);
    response.status(error.status || 500).send(error).json();
}

function Endpoint({ method, handler, reference, name }) {
    if (typeof name !== 'string') {
        throw new Error('Attempting to mount unnamed endpoint');
    }
    if (typeof handler !== 'function') {
        throw new Error(`Endpoint ${name} was not provided with a proper handler.`);
    }
    this.method = method.toLowerCase();
    this.reference = [ 'put', 'delete' ].includes(this.method) || !!reference;
    const requestParser = parsers[this.method];
    if (typeof requestParser !== 'function') {
        throw new Error(`Endpoint ${name} was not provided with a proper method.`);
    }
    this.handler = function endpointRequestHandler(request, response) {
        return requestParser({ request, reference })
            .then(handler)
            .then((data) => response.send(data).json())
            .catch((error) => errorHandler({ error, response, name }));
    }
    if (typeof this.handler !== 'function') {
        throw new Error(`Endpoint ${name} did not mount properly`);
    } else {
        console.log(`Endpoint ${name} successfully mounted`);
    }
}

module.exports = { Endpoint };
