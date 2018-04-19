import { wingDing } from 'controllers';

function helloWorld({ data, session }) {
	console.log(data);
	return wingDing.fooBar();
}

export default {
	method: 'GET',
	handler: helloWorld,
};
