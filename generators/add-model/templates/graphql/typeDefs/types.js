const Model = '<%= model %>';
const fields = [
// gen fieldsArray
<% fields.forEach(function(field){ %>'<%= field[0] %>: <%=field[1]%>',
<% }) %>
]
const fieldsPopulate = [
// gen fieldsPopulate
]
const fieldsParent = [
// gen fieldsParent
]

typeDef = {
    Type: `type ${Model} { ${fieldsPopulate.join(' ')} ${fields.join(' ')} id: ID createdAt: String updatedAt: String }`,
    Input: `input ${Model}Input { ${fieldsParent.join(' ')} ${fields.join(' ')} id: ID }`,
    Query: `${Model}Where(parentId: ID, ${fieldsParent.join(',')}): [${Model}]`,
    Mutation: `delete${Model}(input: OrderitemInput): ${Model}! update${Model}(input: ${Model}Input): ${Model}!`
}

module.exports = typeDef;