import { ADD_MESSAGE } from "./utils/mutations";
import { useMutation } from "@apollo/client";

export default function AddMessage({ id }) {
  const [addMessage] = useMutation(ADD_MESSAGE, {
    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify({
          __typename: "Channel",
          id: id,
        }),
        fields: {
          messages: (previous, { toReference }) => [
            ...previous,
            toReference(data.addMessage),
          ],
        },
      });
    },
  });

  const handleKeyUp = async (evt) => {
    if (evt.keyCode === 13) {
      // TODO: ADD OPTIMISTIC UI
      await addMessage({
        variables: {
          message: {
            channelId: id,
            text: evt.target.value,
          },
        },
      });
      evt.target.value = "";
    }
  };
  return (
    <input type="text" placeholder="+ New message" onKeyUp={handleKeyUp} />
  );
}
