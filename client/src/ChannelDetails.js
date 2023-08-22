import {  useQuery } from "@apollo/client";
import { CHANNEL_DETAILS } from "./utils/queries";
import { useParams } from "react-router-dom";
import AddMessage from "./AddMessage";

import MessagesList from "./MessagesList";

export default function Channel() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(CHANNEL_DETAILS, {
    variables: { channelId: id },
  });

 
  if (loading) {
      // return <ChannelPreview channelId={id}/>
      return <div>Loading Channel...</div>
  }

  if (data.channel === null) {
    return <div>Channel doesn't exist</div>;
  }

  return (
    <>
      {data && (
        <>
          <h1>{data.channel.name} </h1>
          <AddMessage id={id}/>
          <br/>
          <MessagesList messages={data.channel.messages} />
          
        </>
      )}
      {error && <div>ERROR: {error.message}</div>}
    </>
  );
}
