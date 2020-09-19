const { gql } = require('apollo-server');

const typeDefs = gql`

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        status: String
    }

    type CV {
        _id: ID!
        title: String
        summary: String
        personalDetails: PersonalDetails
        employmentHistory: [EmploimentHistory]
        education: [Education]
        social: [Social]
        skills: [Skill]
        courses: [Course]
        internships: [Internship]
        languages: [Language]
        hobbies: String
        createdAT: String
        updatedAT: String
    }

    type CoverLetter {
        _id: ID!
        title: String
        employerDetails: EmployerDetails
        letterDetails: String
        personalDetails: PersonalDetailsForCover
    }

    type EmployerDetails {
        company: String
        manager: String
    }

    type PersonalDetailsForCover {
        fullName: String
        jobTitle: String
        address: String
        email: String
        phone: String
    }

    type PersonalDetails {
        jobTitle: String!
        firstName: String!
        lastName: String!
        email: String!
        phone: String!
        photo: String
        country: String
        city: String
        nationality: String
        dateOfBirth: String
    }

    input PersonalDetailsInput {
        jobTitle: String!
        firstName: String!
        lastName: String!
        email: String!
        phone: String!
        photo: String
        country: String
        city: String
        nationality: String
        dateOfBirth: String
    }

    input EmployHistoryInput {
        jobTitle: String
        employer: String
        startDate: String
        endDate: String
        current: Boolean
        city: String
        description: String
    }

    input EducationInput {
        school: String
        degree: String
        startDate: String
        endDate: String
        current: Boolean
        city: String
        description: String
    }

    input SocialInput {
        label: String
        link: String
    }

    input SkillInput {
        skill: String
        level: String
    }

    input CourseInput {
        course: String
        institution: String
        startDate: String
        endDate: String
        current: Boolean
        description: String
    }

    input InternshipInput {
        jobTitle: String
        employer: String
        startDate: String
        endDate: String
        current: Boolean
        description: String
    }

    input LanguageInput {
        language: String
        level: String
    }

    type EmploimentHistory {
        jobTitle: String
        employer: String
        startDate: String
        endDate: String
        current: Boolean
        city: String
        description: String
    }

    type Education {
        school: String
        degree: String
        startDate: String
        endDate: String
        current: Boolean
        city: String
        description: String
    }

    type Social {
        label: String
        link: String
    }

    type Skill {
        skill: String
        level: String
    }

    type Course {
        course: String
        institution: String
        startDate: String
        endDate: String
        current: Boolean
        description: String
    }

    type Internship {
        jobTitle: String
        employer: String
        startDate: String
        endDate: String
        current: Boolean
        description: String
    }

    type Language {
        language: String
        level: String
    }

    type Hobby {
        hobbies: String
    }

    input UserDataInput {
        email: String
        name: String
        password: String
    }

    input CreateCVInput {
        title: String
        summary: String
        personalDetails: PersonalDetailsInput
        employmentHistory: [EmployHistoryInput]
        education: [EducationInput]
        social: [SocialInput]
        skills: [SkillInput]
        courses: [CourseInput]
        internships: [InternshipInput]
        languages: [LanguageInput]
        hobbies: String
        author: String
    }

    type AuthData {
        token: String!
        userID: String!
    }
    
    type Query {
        login(email: String!, password: String!): AuthData!
        currentUser: User!
        cvs: [CV]!
        cv(id: ID!): CV!
    }

    type Mutation {
        registration(input: UserDataInput!): User!
        createCV(input: CreateCVInput!): CV!
        updateCV(input: CreateCVInput!, id: ID!): CV!
    }
`;

module.exports = typeDefs