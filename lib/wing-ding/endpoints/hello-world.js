import { wingDing } from 'controllers';
// import { fooBar } from 'wing-ding/controller'; // would also work

function helloWorld({ data }) {
	console.log(data);
	return wingDing.fooBar();
}

export default {
	method: 'GET',
	handler: helloWorld,
};
