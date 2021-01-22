module.exports = {
    Type: `
        type File {
            filename: String!
            mimetype: String!
            encoding: String!
        }
        type Loc {
            type: String,
            coordinates: [Float]
        }
        input Location {
            type: String,
            coordinates: [Float]
        }
        type Esti {
            owner: ID,
            value: Float
        }
        input Estimate {
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