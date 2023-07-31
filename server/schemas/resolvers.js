
const channels = [{
    id: 1,
    name: 'sports'
}, {
    id: 2,
    name: 'health'
}]

let nextId = 3;

const resolvers = {
    Query: {
      channels: () => {
        return channels;
      },
    },
    Mutation: {
      addChannel: (parent, args) => {
        const newChannel = {id: nextId++, name:args.name}
        channels.push(newChannel)
        return newChannel;
      }
    }
  };

  module.exports = resolvers;