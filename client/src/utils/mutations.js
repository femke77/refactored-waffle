import { gql } from "@apollo/client"

export const ADD_CHANNEL = gql`
mutation addChannel($name: String!) {
  addChannel(name: $name) {
    name
    id
    __typename
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