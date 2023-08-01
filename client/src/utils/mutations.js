import { gql } from "@apollo/client"

export const ADD_CHANNEL = gql`
mutation addChannel($name: String!) {
  addChannel(name: $name) {
    name
    id
    __typename
  }
}

`