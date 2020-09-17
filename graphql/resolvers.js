const User = require('../mongoDB/models/user');
const Post = require('../mongoDB/models/post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');
require('dotenv').config();

module.exports = {
    Query: {
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                const error = new AuthenticationError('Invalid credentials');
                throw error;
            }

            const isEqual = await bcrypt.compare(password, user.password);

            if (!isEqual) {
                const error = new AuthenticationError('Invalid credentials');
                throw error;
            }

            const token = jwt.sign({
                userID: user._id,
                email: user.email
            }, process.env.SECRET, { expiresIn: '1h' });

            return { token, userID: user._id.toString() }
        },
        currentUser: async (_, {}, context) => {

            if(!context.userID) {
                const error = new Error('User not found');
                throw error;
            }

            const currentUser = await User.findOne({ _id: context.userID });

            return currentUser;

        },
        posts: async (_, {}, context) => {
            if (!context.userID) {
                const error = new AuthenticationError('Unauthorized');
                throw error
            }

            const posts = await Post.find({ author: context.userID });

            return posts;
        }
    },
    Mutation: {
        registration: async (_, { input }) => {
            const { email, password, name } = input;

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                const error = new Error('User already exists');
                throw error;
            }

           const hashedPW = await bcrypt.hash(password, 12);

           const user = new User({
               email,
               name,
               password: hashedPW,
               status: 'Active'
           });
           const createdUser = await user.save();

           return {
               ...createdUser._doc, 
               _id: createdUser._id.toString()
           };
        },
        createPost: async (_, { input }, context) => {
            const { title, content } = input;

            if(!context.userID) {
                const error = new AuthenticationError('Unauthorized');
                throw error;
            }

            const post = new Post({
                title,
                content,
                author: context.userID
            });

            const createdPost = await post.save();


            return {
                ...createdPost._doc,
                _id: createdPost._id.toString(),
                createdAt: createdPost.createdAt.toISOString(),
            }
        }
    }
}