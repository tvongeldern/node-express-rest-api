import { Schema } from 'mongoose';

const WingDing = new Schema({});

const publicFields = {};

const adminFields = {
	...publicFields,
};

export default {
	Schema: WingDing,
	fields: {
		public: publicFields,
		admin: adminFields,
	},
};
