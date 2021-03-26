module.exports = {
Type: `
type <%= model %> {
<% fields.forEach(function(field){ %><%= field[0] %>: <%=field[1]%>
<% }) %>
id: ID!
createdAt: String
updatedAt: String
}
`,
Input: `
input <%= model %>Input {
<% fields.forEach(function(field){ %><%= field[0] %>: <%=field[1]%>
<% }) %>
id: ID
}
`,
Query: `
<%= model %>Where(parentId: ID): [<%= model %>]
`,
Mutation: `
delete<%= model %>(input: <%= model %>Input): <%= model %>!
update<%= model %>(input: <%= model %>Input): <%= model %>!
`
}