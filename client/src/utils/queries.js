import { gql } from "@apollo/client";

export const CHANNEL_LISTS = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }

`