const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    status: String
    permissions: String!
  }

  input UserDataInput {
    email: String
    name: String
    password: String
  }

  type Query {
    currentUser: User!
  }

  type Mutation {
    registration(input: UserDataInput!): User!
    login(email: String!, password: String!): User!
    changePassword(oldPassword: String!, newPassword: String!): Boolean!
    invalidateTokens: Boolean!
  }
`;

module.exports = typeDefs;
