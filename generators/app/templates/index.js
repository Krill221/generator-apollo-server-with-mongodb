require('dotenv').config();

const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();

const server = new ApolloServer({
	cors: {
		  origin: "*",
		  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		  preflightContinue: false,
		  optionsSuccessStatus: 204,
		  credentials: true
	},
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req, pubsub }),
});

mongoose
	.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('MongoDB Connected');
		return server.listen({ port: process.env.PORT });
	})
	.then((res) => {
		console.log(`Server running`);
		console.log(`Listening on ${ process.env.PORT }`);
	})
	.catch(err => {
		console.error(err)
	})
