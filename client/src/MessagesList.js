import { useEffect } from "react";

export default function MessagesList(props) {
  
  useEffect(()=> {
    props.subscribeToNewMessages()
  })
  
  
  return (
    <>
      {props.messages.length
        ? props.messages.map((msg) => <p key={msg.id}>{msg.text}</p>)
        : "No messages yet"}
    </>
  );
}
