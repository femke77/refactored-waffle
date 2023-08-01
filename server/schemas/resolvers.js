
const channels = [{
    id: "1",
    name: 'beauty',
    messages:[{
      id: "2",
      text: 'wash your face!'
    }]
}, {
    id: "2",
    name: 'health',
    messages:[
    //  {
      // id: "3",
      // text: 'take your vitamins!'
//    }
  ]
}]

let nextId = "3";
let nextMessageId = "3";

const resolvers = {
    Query: {
      channels: () => {
        return channels;
      },
      channel: (parent, {id})=> {
     
        return (channels.find(ch => ch.id === id)) 
      }
    },
    Mutation: {
      addChannel: (parent, args) => {
        const newChannel = {id:nextId++, name:args.name}
        channels.push(newChannel)
        return newChannel;
      },
      addMessage: async (parent, {message}) => {
        const channel = channels.find(ch => ch.id === message.channelId)
        if (!channel)
        throw new Error("Channel does not exist")
        
        const newMessage = {id: String(nextMessageId++), text: message.text}
        channel.messages.push(newMessage)
        return newMessage;
      }
    }
  };

  module.exports = resolvers;