module.exports = {
Type: `
type User {
email: String
token: String
username: String
password: String
id: ID
createdAt: String
updatedAt: String
}
`,
Input: `
input RegisterInput {
username: String!
password: String!
confirmPassword: String!
email: String!
}
input UserInput {
username: String
email: String
password: String
id: ID
}
`,
Query: `
UserWhere(parentId: ID): [User]
`,
Mutation: `
deleteUser(input: UserInput): User!
updateUser(input: UserInput): User!
register(registerInput: RegisterInput): User!
login(username: String!, password: String!): User!
`
}