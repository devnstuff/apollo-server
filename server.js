const { ApolloServer, AuthenticationError } = require('apollo-server');
const connectDB = require('./config/db');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const colors = require('colors')
const typeDefs = require('./graphql/types');
const resolvers = require('./graphql/resolvers');

dotenv.config();
connectDB();

const server = new ApolloServer({
    cors: {
        origin: '*',
        credentials: true
    },
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        
        if (token) return { userID, email } = jwt.verify(token.split(' ')[1], process.env.SECRET);
        return null;
    }
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 Server is up and running on URL: ${url}`);
});