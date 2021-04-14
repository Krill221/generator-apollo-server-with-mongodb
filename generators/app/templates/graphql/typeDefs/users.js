const Model = 'User';
const fields = [
    'avatar: String',
    'email: String',
    'username: String',
    'password: String',
]
const fieldsPopulate = [
]

const fieldsParent = [
]

typeDef = {
    Type: `type ${Model} { ${fieldsPopulate.join(' ')} ${fields.join(' ')} token: String id: ID createdAt: String updatedAt: String }`,
    Input: `
        input ${Model}Input { ${fieldsParent.join(' ')} ${fields.join(' ')} id: ID }
        input RegisterInput {
            username: String!
            password: String!
            confirmPassword: String!
            email: String!
        }
    `,
    Query: `${Model}Where(parentId: ID, ${fieldsParent.join(',')}): [${Model}]`,
    Mutation: `
        delete${Model}(input: ${Model}Input): ${Model}!
        update${Model}(input: ${Model}Input): ${Model}!
        register(registerInput: RegisterInput): ${Model}!
        login(username: String!, password: String!): ${Model}!
    `
}

module.exports = typeDef;