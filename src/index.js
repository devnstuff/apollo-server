const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const colors = require('colors')
const typeDefs = require('./graphql/types');
const resolvers = require('./graphql/resolvers');

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
    origin: '*',
    credentials: true
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
                
        if (token) return { userID, email } = jwt.verify(token.split(' ')[1], process.env.SECRET);
        return null;
    },
    engine: {    
        reportSchema: true,
        variant: "current"
      },
    introspection: true,
    playground: true
});

const PORT = process.env.PORT || 5000;

server.applyMiddleware({ app, cors: corsOptions });

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});