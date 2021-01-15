//top for generation
const users = require('./users');
const upload = require('./uploadFile');
const pay = require('./paymentYandexKassa');

module.exports = {
	Query: {
		...users.Query,
		...pay.Query,
	},
	Mutation: {
		...users.Mutation,
		...upload.Mutation,
		...pay.Mutation,
	}
};
