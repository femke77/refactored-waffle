// import { useQuery } from "@apollo/client";
// import { CHANNEL_QUERY } from "./utils/queries";
// import { gql,client } from "@apollo/client";
// // this was to preview from the cache - need to update
// export default function ChannelPreview({channelId}) {
//     const { channel } = client.readQuery({
//         query: gql`
//           query ReadChannel($channelId: ID!) {
//             channel(id: $channelId) {
//               id
//               name
//             }
//           }
//         `,
//         variables: {
//           id: channelId,
//         },
//       });

//   return (
//     <div>
//       <div className="channelName">{channel ? channel.name : "Loading..."}</div>
//       <div>Loading Messages</div>
//     </div>
//   );
// }
