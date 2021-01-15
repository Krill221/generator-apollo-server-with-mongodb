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
<%= model %>sWhereLocation(location_name: String, lat: String, lng: String, distance: String): [<%= model %>]
<%= model %>sWhere(ids: [ID]): [<%= model %>]
<%= model %>s: [<%= model %>]
`,
	Mutation: `
delete<%= model %>(id: ID!): String!
update<%= model %>(input: <%= model %>Input): <%= model %>!
`
}