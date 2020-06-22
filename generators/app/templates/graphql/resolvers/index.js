//top for generation
const usersResolvers = require('./users');
const uploadResolvers = require('./uploadFile');


module.exports = {
	Query: {
		...usersResolvers.Query,
	},
	Mutation: {
		...usersResolvers.Mutation,
		...uploadResolvers.Mutation,
	}
};
