module.exports = {
    Type: `
        type User {
            email: String
            token: String
            username: String
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
`,
    Query: `
        Users: [User]
`,
    Mutation: `
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        deleteUser(id: ID!): String!
        updateUser(
            id: ID,
            username: String,
            email: String,
            password: String
        ): User!
`
}