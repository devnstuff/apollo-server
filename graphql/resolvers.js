const User = require('../mongoDB/models/user');
const CV = require('../mongoDB/models/cv');
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
                const error = new AuthenticationError('User not found');
                throw error;
            }

            const currentUser = await User.findOne({ _id: context.userID });

            return currentUser;

        },
        cvs: async (_, {}, context) => {

            if(!context.userID) {
                const error = new AuthenticationError('User not found');
                throw error;
            }

            const cvs = await CV.find({ author: context.userID });

            return cvs;
        },
        cv: async (_, { id }, context) => {

            if(!context.userID) {
                const error = new Error('User not found');
                throw error;
            }

            const cv = await CV.findOne({ _id: id });

            return cv;
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
        createCV: async (_, { input }, context) => {
            const { title, summary, personalDetails, employmentHistory, education, social, skills, courses, internships, languages, hobbies } = input;

            if(!context.userID) {
                const error = new AuthenticationError('Unauthorized');
                throw error;
            }

            const cv = new CV({
                title,
                summary,
                personalDetails,
                employmentHistory,
                education,
                social,
                skills,
                courses,
                internships,
                languages,
                hobbies,
                author: context.userID
            });

            const createdCV = await cv.save();

            return {
                ...createdCV._doc,
                _id: createdCV._id.toString(),
            }
        },
        updateCV: async (_, { input, id }, context) => {

            if(!context.userID) {
                const error = new AuthenticationError('Unauthorized');
                throw error;
            }

            const cv = await CV.findOneAndUpdate({ _id: id }, { ...input }, { new: true });

            return cv;
        },
    }
}