const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const express = require('express');
const cookieParser = require('cookie-parser');
const { sign, verify } = require('jsonwebtoken');
const colors = require('colors');

const connectDB = require('./config/db');
const typeDefs = require('./graphql/types');
const resolvers = require('./graphql/resolvers');
const User = require('./mongoDB/models/user');

const {
  PORT,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require('./config/constants');

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

const app = express();
app.use(cookieParser());

app.use(async (req, res, next) => {
  const refreshToken = req.cookies['refresh_token'];
  const accessToken = req.cookies['access_token'];

  if (!refreshToken && !accessToken) {
    return next();
  }

  try {
    const { userID } = verify(accessToken, ACCESS_TOKEN_SECRET);
    req.userID = userID;
    return next();
  } catch {}

  if (!refreshToken) {
    return next();
  }

  let data;

  try {
    data = verify(refreshToken, REFRESH_TOKEN_SECRET);
  } catch {
    return next();
  }

  try {
    const user = await User.findOne({ _id: data.userID });

    if (!user || user.count !== data.count) {
      return next();
    }

    const token = sign(
      {
        userID: user._id,
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('access_token', token);
    req.userID = user._id;
  } catch {}

  next();
});

server.applyMiddleware({ app });

app.listen({ port: PORT || 4000 }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
