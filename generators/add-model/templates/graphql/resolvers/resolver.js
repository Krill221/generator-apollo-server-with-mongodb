const <%=model%> = require('../../models/<%=model%>');
const User = require('../../models/User');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Query: {
        async <%=small_models%>() {
            try {
				const <%=small_models%> = await <%=model%>.find().sort({ createdAt: -1 });//g-key populate
				return <%=small_models%>;
            } catch (err) {
                throw new Error(err);
            }
		},
		async <%=small_models%>_where(_, { ids }) {
            try {
				let _ids = [];
				if (ids !== undefined) _ids = ids;
                const <%=small_models%> = await <%=model%>.find().where('_id').in(_ids).sort({ createdAt: -1 });//g-key populate
                return <%=small_models%>;
            } catch (err) {
                throw new Error(err);
            }
		},
		async <%=small_models%>_where_location(_, { location_name, lat, lng, distance }) {
			try {
			  const <%=small_models%> = await <%=model%>.find({
				location_name: { ///???? TODO
				  $near: {
					$maxDistance: parseFloat(distance),
					$geometry: {
					  type: "Point",
					  coordinates: [parseFloat(lat), parseFloat(lng)]
					}
				  }
				}
			  }).sort({ createdAt: -1 });//g-key populate
			  return <%=small_models%>;
			} catch (err) {
			  throw new Error(err);
			}
		},
	},
	Mutation: {
		async update<%=model%>(_, { id, <%= fields.map(f => f[0]).join(', ') %>, }, context) {
			try {
				let item;
				if (!id || id === 'new') {
					item = new <%=model%>({
						<% fields.forEach(function(field){ %><%= field[0] %>,
						<% }) %>
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString()
					});
					//g-key after new
				} else {
					item = await <%=model%>.findById(id);
					<% fields.forEach(function(field){ %>if (<%= field[0] %> !== undefined) item.<%= field[0] %> = <%= field[0] %>;
					<% }) %>
					item.updatedAt =  new Date().toISOString();
				}
				await item.save();
				return item;
			} catch (err) {
				throw new Error(err);
			}
		},

		async delete<%=model%>(_, { id }, context) {
			try {
				const del = await <%=model%>.findById(id);
				await del.delete();
				return 'deleted successfully';
			} catch (err) {
				throw new Error(err);
			}
		},

	}
};
