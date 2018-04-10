const parsers = {
    get: function ParseGET(request) {
        return Promise.resolve({
            data: request.query || {},
            reference: request.route.path.split('/').filter(p => p).reverse()[0],
        });
    },
    post: function ParsePOST(request) {
        return Promise.resolve({
            data: request.body || {},
            reference: request.route.path.split('/').filter(p => p).reverse()[0],
        });
    },
    put: function ParsePUT(request) {
        return Promise.resolve({
            data: request.body || {},
        });
    },
    delete: function ParseDELETE(request) {
        return Promise.resolve({
            reference: request.route.path.split('/').filter(p => p).reverse()[0],
        });
    },
};

function errorHandler(error) {}

function Endpoint({ method, handler, name }) {
    if (typeof name !== 'string') {
        throw new Error('Attempting to mount unnamed endpoint');
    }
    if (typeof handler !== 'function') {
        throw new Error(`Endpoint ${name} was not provided with a proper handler.`);
    }
    this.method = method.toLowerCase();
    const requestParser = parsers[this.method];
    if (typeof requestParser !== 'function') {
        throw new Error(`Endpoint ${name} was not provided with a proper method.`);
    }
    this.handler = function endpointRequestHandler(request, response) {
        return requestParser(request)
            .then(handler)
            .then((data) => response.send(data).json())
            .catch(errorHandler);
    }
    if (typeof this.handler !== 'function') {
        throw new Error(`Endpoint ${name} did not mount properly`);
    } else {
        console.log(`Endpoint ${name} successfully mounted`);
    }
}

module.exports = { Endpoint };
