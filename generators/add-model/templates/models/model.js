const { model, Schema } = require('mongoose');

const <%= model %>Schema = new Schema({
    <% fields.forEach(function(field){ %><%= field[0] %>: <%if(field[1] === 'ID'){%>{type: Schema.Types.ObjectId, ref: 'Object'}<%} else {%><%=field[1]%><%}%>,
    <% }) %>

    createdAt: String,
    updatedAt: String,
});

module.exports = model('<%= model %>', <%= model %>Schema);