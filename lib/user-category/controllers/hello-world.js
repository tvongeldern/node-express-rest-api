function helloWorld() {
    return Promise.resolve({
        hello: 'WORLD',
    });
}

module.exports = helloWorld;
