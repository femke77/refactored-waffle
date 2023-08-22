const express = require("express");
const { createServer } = require("http");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { typeDefs, resolvers } = require("./schemas");
// const db = require('./config/connection');
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });


const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/subscription",
});


const serverCleanup = useServer({ schema }, wsServer);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
