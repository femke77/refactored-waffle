import { gql } from "@apollo/client";

export const CHANNEL_LISTS = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }

`;


export const CHANNEL_DETAILS = gql`
  query ChannelDetailsQuery($channelId: ID!) {
    channel(id: $channelId) {
      id
      name
      messages {
        id
        text
      }
    }
  }
`;

export const CHANNEL_QUERY = gql`
  query ChannelQuery($channelId: ID!) {
    channel(id: $channelId) {
      id
      name
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($message: MessageInput!) {
    addMessage(message: $message) {
      id
      text
    }
  }
`;

