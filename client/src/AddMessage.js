import { ADD_MESSAGE } from "./utils/mutations";
import { useMutation } from "@apollo/client";

export default function AddMessage({ id }) {

  //cache was causing duplicate messages so it was removed.
  const [addMessage] = useMutation(ADD_MESSAGE, {
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
