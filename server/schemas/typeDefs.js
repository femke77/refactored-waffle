// const { gql } = require('apollo-server-express');

const typeDefs =`
type Channel {
    id: ID!               
    name: String
 }

 type Query {
    channels: [Channel]  
 }

 type Mutation {
   addChannel(name: String!): Channel
 }
 `;



 module.exports = typeDefs;