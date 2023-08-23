import React, { Component } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
} from "@apollo/client";
import { HttpLink } from "apollo-link-http";
import "./App.css";
import ChannelsList from "./components/ChannelsList";
import Channel from "./components/ChannelDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

// websock link
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:3001/subscription",
  })
);
// authentication link
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
// httpLink (for websocket)
const httpLink = new HttpLink({
  uri: "http://localhost:3001/graphql",
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  authLink.concat(wsLink),
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <div className="App-header">
              <h2>Welcome to Apollo GraphQL</h2>
            </div>
            <Routes>
              <Route path="/" element={<ChannelsList />} />
              <Route path="/channels/:id" element={<Channel />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}
export default App;
