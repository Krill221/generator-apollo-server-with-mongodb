module.exports = {
    Type: `
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
`,
    Query: `
        checkPayment(payId: String): String
`,
    Mutation: `
        uploadFile(file: Upload!): File
        deleteFile(file: String!): String!
        makePayment(payId: String, sum: String): String
`
}