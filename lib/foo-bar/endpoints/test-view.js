// THIS IS A TEST ENDPOINT THAT RETURNS A HELLO WORLD OBJECT
// CREATED TO TEST API AND INDEX FILE STRUCTURE
import { helloWorld } from 'foo-bar/controller';

function userCategoryEndpointsTest({ data, reference }) {
	console.log('request query: ', data);
	console.log('request param: ', reference || 'N/A');
	return helloWorld();
}

export default {
	method: 'GET',
	handler: userCategoryEndpointsTest,
	reference: true, // SETTING THIS TO TRUE MAKES THE ENDPOINT REQUIRE A PARAM
};
