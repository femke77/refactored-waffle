import React, { Component } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
} from "@apollo/client";
import { HttpLink } from "apollo-link-http";
import "./App.css";
import ChannelsList from "./ChannelsList";
import Channel from "./ChannelDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const wsLink = new WebSocketLink({
  uri: "ws://localhost:3001/sub",
  options: {
    reconnect: true,
    lazy: true,
    timeout: 30000,
  },
});

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
  wsLink,
  httpLink
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
              <h2>Welcome to Apollo</h2>
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
