const { gql } = require('apollo-server');

const typeDefs = gql`

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        status: String
    }

    type Post {
        _id: ID!
        title: String!
        content: String!
        createdAt: String!
        author: String!
    }

    type AuthData {
        token: String!
        userID: String!
    }

    input UserDataInput {
        email: String!
        name: String!
        password: String!
    }

    input PostDataInput {
        title: String!
        content: String!
        author: String
    }
    
    type Query {
        login(email: String!, password: String!): AuthData!
        currentUser: User!
        posts: [Post]!
    }

    type Mutation {
        registration(input: UserDataInput!): User!
        createPost(input: PostDataInput!): Post!
    }
`;

module.exports = typeDefs