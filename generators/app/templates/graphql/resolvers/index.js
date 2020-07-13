//top for generation
const usersResolvers = require('./users');
const uploadResolvers = require('./uploadFile');
const payResolvers = require('./paymentYandexKassa');

module.exports = {
	Query: {
		...usersResolvers.Query,
		...payResolvers.Query,
	},
	Mutation: {
		...usersResolvers.Mutation,
		...uploadResolvers.Mutation,
		...payResolvers.Mutation,
	}
};
