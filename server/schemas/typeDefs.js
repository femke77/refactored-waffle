// const { gql } = require('apollo-server-express');

const typeDefs =`
type Channel {
    id: ID!               
    name: String!
    messages: [Message]
 }

 type Message {
   id: ID!
   text: String
 }

 input MessageInput{
   channelId: ID!
   text: String
 }
 type Query {
    channels: [Channel]  
    channel(id: ID!): Channel
 }

 type Mutation {
   addChannel(name: String!): Channel
   addMessage(message: MessageInput!): Message
 }
 `;



 module.exports = typeDefs;