
const channels = [{
    id: 1,
    name: 'sports'
}, {
    id: 2,
    name: 'health'
}]

const resolvers = {
    Query: {
      channels: () => {
        return channels;
      },
    },
  };

  module.exports = resolvers;