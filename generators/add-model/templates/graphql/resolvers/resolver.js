const Helper = require('../../util/helpers.js');
const MainModel = require('../models/<%=model%>');
// key model import
// exp: const belongTo = ['room'];
const belongTo = [''];
// for Estimate exp: const fieldsArray = ['value', 'userId', 'room'];
const fieldsArray = [<% fields.forEach(function(field){ %>'<%= field[0] %>', <% })%>];
// exp: const HasMany = [{model: Comment, parentKey: 'roomId'}];
const HasMany = [];
const timeDaley = 0;

module.exports = {
    Query: {
        async <%=model%>Where(_, params, context) {
			try {
				return Helper.Find(MainModel, params, belongTo, timeDaley);
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async update<%=model%>(_, { input: params }, context) {
			try {
				return Helper.Update(MainModel, params, belongTo, fieldsArray, HasMany, timeDaley);
				//return Helper.UpdateEstimate(MainModel, params, belongTo, fieldsArray, HasMany, context, timeDaley);
			} catch (err) {
				throw new Error(err);
			}
		},
		async delete<%=model%>(_, { input: params }, context) {
			try {
				return Helper.Delete(MainModel, params, timeDaley);
			} catch (err) {
				throw new Error(err);
			}
		},
	}
};