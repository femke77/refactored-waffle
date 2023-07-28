import React, { Component } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink
} from "@apollo/client";
import { HttpLink } from "apollo-link-http";
import { graphql } from "@apollo/client/react/hoc";
import "./App.css";

const link = new HttpLink({
  uri: "http://localhost:3001/graphql"
})

const client = new ApolloClient({
 link,
  cache: new InMemoryCache(),
});


const ChannelsList = ({ data: { loading, error, channels } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  } return <ul>
    {channels.map(ch => <li key={ch.id}>{ch.name}</li>)}
  </ul>;
};


const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;
const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <h2>Welcome to Apollo</h2>
          </div>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    );
  }
}
export default App;
