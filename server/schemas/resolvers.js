const {PubSub, withFilter} = require("graphql-subscriptions")
const pubsub = new PubSub()

let channels = [
  {
    id: "1",
    name: "Let's Talk about Code!",
    messages: [
      {
        id: "1",
        text: "I LOVE apollo!!!",
      },
    ],
  },
  {
    id: "2",
    name: "Let's Talk about Health!",
    messages: [{
      id: '1',
      text: "I'm taking vitamins now."
    }],
  },
];

let nextId = "3";
let nextMessageId = "2";

const resolvers = {
  Query: {
    channels: () => {
      return channels;
    },
    channel: (parent, { id }) => {
      return channels.find((ch) => ch.id === id);
    },
  },
  Mutation: {
    addChannel: (parent, args) => {
      const newChannel = { id: nextId++, name: args.name };
      channels.push(newChannel);
      return newChannel;
    },

    addMessage: (root, { message }) => {
      const channel = channels.find(
        (channel) => channel.id === message.channelId
      );
      if (!channel) throw new Error("Channel does not exist");

      const newMessage = { id: String(nextMessageId++), text: message.text };
      channel.messages.push(newMessage);
      
      pubsub.publish("messageAdded", {
  
        messageAdded: newMessage,
        channelId: message.channelId,
      });
      return newMessage;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: withFilter(() => pubsub.asyncIterator("messageAdded"),
        (payload, variables) => {
          console.log("subscription messagedAdded working");
          return payload.channelId === variables.channelId;
        }
      )
    }
  }
};


module.exports = resolvers;
