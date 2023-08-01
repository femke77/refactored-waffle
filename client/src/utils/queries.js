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