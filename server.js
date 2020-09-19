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
});

server.applyMiddleware({ app, cors: corsOptions });

app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server is up and running in ${process.env.ENV} mode on PORT:${process.env.PORT}`);
});