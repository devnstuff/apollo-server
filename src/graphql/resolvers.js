const { ApolloError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const User = require('../mongoDB/models/user');

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require('../config/constants');

module.exports = {
  Query: {
    currentUser: async (_, __, { req }) => {
      if (!req.userID) {
        const error = new ApolloError('Token expired, please sign in again');
        throw error;
      }

      const currentUser = await User.findOne({ _id: req.userID });

      return currentUser;
    },
  },
  Mutation: {
    registration: async (_, { input }) => {
      const { email, password, name } = input;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        const error = new ApolloError('User already exists');
        throw error;
      }

      const hashedPW = await bcrypt.hash(password, 12);

      const user = new User({
        email,
        name,
        password: hashedPW,
        status: 'Active',
      });
      const createdUser = await user.save();

      return {
        ...createdUser._doc,
        _id: createdUser._id.toString(),
      };
    },
    login: async (_, { email, password }, { res }) => {
      const user = await User.findOne({ email });

      if (!user) {
        const error = new ApolloError('Invalid credentials');
        throw error;
      }

      const isEqual = await bcrypt.compare(password, user.password);

      if (!isEqual) {
        const error = new ApolloError('Invalid credentials');
        throw error;
      }

      const token = sign(
        {
          userID: user._id,
        },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      );

      const refreshToken = sign(
        {
          userID: user._id,
          count: user.count,
        },
        REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
      );

      res.cookie('access_token', token);
      res.cookie('refresh_token', refreshToken);

      return user;
    },
    changePassword: async (_, { oldPassword, newPassword }, { req }) => {
      if (!req.userID) {
        return false;
      }

      const user = await User.findOne({ _id: req.userID });

      const isEqual = await bcrypt.compare(oldPassword, user.password);

      if (oldPassword === newPassword) {
        const error = new ApolloError(
          'New password should not be the same as the old one'
        );
        throw error;
      }

      if (!isEqual) {
        const error = new ApolloError('Incorrect password');
        throw error;
      }

      const hashedPW = await bcrypt.hash(newPassword, 12);
      user.password = hashedPW;
      await user.save();

      return true;
    },
    invalidateTokens: async (_, __, { req }) => {
      if (!req.userID) {
        return false;
      }

      const user = await User.findOne({ _id: req.userID });
      if (!user) {
        return false;
      }

      user.count += 1;
      await user.save();

      return true;
    },
  },
};
