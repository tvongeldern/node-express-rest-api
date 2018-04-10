// THIS IS A TEST ENDPOINT THAT RETURNS A HELLO WORLD OBJECT
// CREATED TO TEST API AND INDEX FILE STRUCTURE

const method = 'GET';

function userCategoryEndpointsTest({ data, reference }) {
    return Promise.resolve({
        hello: 'world',
    });
}

module.exports = {
    method,
    handler: userCategoryEndpointsTest,
};
