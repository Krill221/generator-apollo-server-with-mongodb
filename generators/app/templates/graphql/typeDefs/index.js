const { gql } = require('apollo-server');
//top for generation
const likes = require('./likes');
const comments = require('./comments');
const rooms = require('./rooms');
const users = require('./users');
const helpers = require('./helpers');

module.exports = gql`
    ${users.Type}
	${users.Input}
	${helpers.Type}
	${likes.Input}
	${likes.Type}
	${comments.Input}
	${comments.Type}
	${rooms.Input}
	${rooms.Type}

    type Query {
		${likes.Query}
		${comments.Query}
		${rooms.Query}
		${users.Query}
		${helpers.Query}
    }
    type Mutation {
		${likes.Mutation}
		${comments.Mutation}
		${rooms.Mutation}
		${users.Mutation}
		${helpers.Mutation}
    }
`;

