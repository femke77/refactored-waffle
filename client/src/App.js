import React, { Component } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { HttpLink } from "apollo-link-http";
import { graphql } from "@apollo/client/react/hoc";
import "./App.css";
import AddChannel from "./AddChannel";
import { CHANNEL_LISTS } from "./utils/queries";
import { useQuery } from "@apollo/client";
import ChannelsList from "./ChannelsList";

const link = new HttpLink({
  uri: "http://localhost:3001/graphql"
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});


class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <h2>Welcome to Apollo</h2>
          </div>
          <ChannelsList />
        </div>
      </ApolloProvider>
    );
  }
}
export default App;
