import React, { Component } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { HttpLink } from "apollo-link-http";
import "./App.css";
import ChannelsList from "./ChannelsList";
import Channel from "./Channel";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
        <Router>
        <div className="App">
          <div className="App-header">
            <h2>Welcome to Apollo</h2>
          </div>
          <Routes>
            <Route path="/" element={<ChannelsList/>}/>
            <Route path="/channels/:id" element={<Channel/>}/>
          </Routes>
        
        </div>
        </Router>
      </ApolloProvider>
    );
  }
}
export default App;
