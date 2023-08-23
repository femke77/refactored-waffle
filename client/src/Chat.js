// import React, { useState } from "react";

// import {
//   ApolloClient,
//   InMemoryCache,
//   useMutation,
//   useSubscription,
//   gql,
// } from "@apollo/client";
// import { WebSocketLink } from "@apollo/client/link/ws";
// import { Container, Chip, Grid, TextField, Button } from "@material-ui/core";

// // create an open socket for real time communication
// const link = new WebSocketLink({
//   uri: `ws://localhost:4000/`,
//   options: {
//     reconnect: true,
//   },
// });

// // ue the apollo cache for instant updates to the screen
// export const client = new ApolloClient({
//   link,
//   uri: "http://localhost:4000/", //connect to server
//   cache: new InMemoryCache(),
// });

// // queries.js
// const GET_MESSAGES = gql`
//   subscription {
//     messages {
//       id
//       user
//       text
//     }
//   }
// `;

// const POST_MESSAGE = gql`
//   mutation($user: String!, $text: String!) {
//     postMessage(user: $user, text: $text)
//   }
// `;

// // resolvers.js
// const Messages = ({ user }) => {
//   const { data } = useSubscription(GET_MESSAGES);
//   if (!data) {
//     return null;
//   }
//   return (
//     <div style={{ marginBottom: "5rem" }}>
//       {data.messages.map(({ id, user: messageUser, text }) => {
//         return (
//           <div
//             key={id}
//             style={{ textAlign: user === messageUser ? "right" : "left" }}
//           >
//             <p style={{ marginBottom: "0.3rem" }}>{messageUser}</p>
//             <Chip
//               style={{ fontSize: "0.9rem" }}
//               color={user === messageUser ? "primary" : "secondary"}
//               label={text}
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // Chat function
// export const Chat = () => {
//   const [user, setUser] = useState("Meg");
//   const [text, setText] = useState("");
//   const [postMessage] = useMutation(POST_MESSAGE);
//   const sendMessage = () => {
//     if (text.length > 0 && user.length > 0) {
//       postMessage({
//         variables: {
//           user: user,
//           text: text,
//         },
//       });
//       setText("");
//     } else {
//       alert("Missing fields!");
//     }
//   };

//   return (
//     <Container>
//       <h3>Welcome to this simple chat app for graphql subscription!</h3>
//       <Messages user={user} />
//       <Grid container spacing={2}>
//         <Grid item xs={3}>
//           <TextField
//             onChange={(e) => {
//               setUser(e.target.value);
//             }}
//             value={user}
//             size="small"
//             fullWidth
//             variant="outlined"
//             required
//             label="Required"
//           />
//         </Grid>
//         <Grid item xs={8}>
//           <TextField
//             onChange={(e) => {
//               setText(e.target.value);
//             }}
//             value={text}
//             size="small"
//             fullWidth
//             variant="outlined"
//             required
//             label="Required"
//           />
//         </Grid>
//         <Grid item xs={1}>
//           <Button
//             onClick={sendMessage}
//             fullWidth
//             variant="contained"
//             style={{ backgroundColor: "#60a820", color: "white" }}
//           >
//             Send
//           </Button>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };
