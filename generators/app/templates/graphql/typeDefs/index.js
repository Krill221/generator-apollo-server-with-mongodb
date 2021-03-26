const { gql } = require('apollo-server');
//top for generation
const users = require('./users');
const helpers = require('./helpers');

module.exports = gql`
    ${users.Type}
	${users.Input}
	${helpers.Type}

    type Query {
		${users.Query}
		${helpers.Query}
    }
	type Mutation {
		${users.Mutation}
		${helpers.Mutation}
    }
`;
