const { gql } = require('apollo-server');

module.exports = gql`
	type User {
		email: String!
		token: String!
		password: String!
		username: String!

		id: ID
		createdAt: String
		updatedAt: String
	}
	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}
	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}
	type Location {
		type: String,
		coordinates: [Float]
	}
	type Estimate {
		owner: ID,
		value: Float
	}
	type Query {
		users: [User]
		user(id: ID): User
	}
	type Mutation {
		register(registerInput: RegisterInput): User!
		login(username: String!, password: String!): User!

		deleteUser(id: ID!): String!
		updateUser(
			id: ID,
			username: String!,
			email: String!,
			password: String!
		): String!

		uploadFile(file: Upload!): File
		deleteFile(file: String!): String!
    }
`;
