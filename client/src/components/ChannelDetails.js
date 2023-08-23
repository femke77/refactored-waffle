import { useQuery, useSubscription, useEffect } from "@apollo/client";
import { CHANNEL_DETAILS } from "../utils/queries";
import { useParams } from "react-router-dom";
import AddMessage from "./AddMessage";
import { messagesSubscription } from "../utils/queries";
import MessagesList from "./MessagesList";

export default function Channel() {
  const { id } = useParams();

  const { loading, data, error, subscribeToMore } = useQuery(CHANNEL_DETAILS, {
    variables: { channelId: id },
  });

  if (loading) {
    return <div>Loading channel ...</div>;
  }
  if (data.channel === null) {
    return <div>Channel doesn't exist</div>;
  }

  return (
    <>
      {data && (
        <>
          <h1>{data.channel.name} </h1>
          <AddMessage id={id} messages={data.channel.messages} />
          <br />
          <MessagesList
            messages={data.channel.messages}
            subscribeToNewMessages={() => {
              subscribeToMore({
                document: messagesSubscription,
                variables: { channelId: id },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;
                  const newMessage = subscriptionData.data.messageAdded;

                  if (
                    !prev.channel.messages.find(
                      (msg) => msg.id === newMessage.id
                    )
                  ) {
                    return Object.assign({}, prev, {
                      channel: Object.assign({}, prev.channel, {
                        messages: [...prev.channel.messages, newMessage],
                      }),
                    });
                  } else {
                    return prev;
                  }
                },
              });
            }}
          />
        </>
      )}
    </>
  );
}
