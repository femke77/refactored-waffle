const {PubSub, withFilter} = require("graphql-subscriptions")
const pubsub = new PubSub()

let channels = [
  {
    id: "1",
    name: "beauty",
    messages: [
      {
        id: "2",
        text: "wash your face!",
      },
    ],
  },
  {
    id: "2",
    name: "health",
    messages: [],
  },
];

let nextId = "3";
let nextMessageId = "3";

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
    // // Old addMessage prior to subscriptions. Worked fine with polling.

    // addMessage: async (parent, { message }) => {
    //   const channel = channels.find((ch) => ch.id === message.channelId);
    //   if (!channel) throw new Error("Channel does not exist");

    //   const newMessage = { id: String(nextMessageId++), text: message.text };
    //   channel.messages.push(newMessage);
    //   return newMessage;
    // },
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
          console.log("test");
          return payload.channelId === variables.channelId;
        }
      )
    }
  }
};


module.exports = resolvers;
