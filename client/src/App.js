import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { client, Chat } from "./Chat";
import ChannelsList from "./ChannelsList";
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h2>Welcome to Apollo Chat 💭</h2>
        <Chat />
        <ChannelsList />
      </div>
    </ApolloProvider>
  );
}

export default App;
