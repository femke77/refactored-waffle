import { useMutation, useQuery } from "@apollo/client"
import { CHANNEL_DETAILS } from "./utils/queries"
import { useParams } from "react-router-dom"
import { ADD_MESSAGE } from "./utils/mutations"
export default function Channel() {

    const { id } = useParams()

    const { data, loading, error } = useQuery(CHANNEL_DETAILS, {
        variables: { channelId: id },  
    })  
   

    // example of updating the cache when you have a query that has an arg
    // and a mutation that needs to modify the object (channel has array)
    const [addMessage] = useMutation(ADD_MESSAGE,{
      update: (cache, {data})=> {
        cache.modify({
            id: cache.identify({
                __typename: "Channel",
                id: id,
            }),
            fields:{
                messages: (previous, {toReference}) => [...previous, toReference(data.addMessage) ]
            }
        })
      }

        
    })
 
    // Update using normalized cache
    if (loading) {
        // return <ChannelPreview channelId={id}/>
        return <div>Loading Channel...</div>
    }

    const handleKeyUp = async (evt) => {
        if (evt.keyCode === 13) {
            // TODO: ADD OPTIMISTIC UI
            await addMessage({
                variables: {
                    message: {
                        channelId: id,
                        text: evt.target.value
                    }
                },
               
            })
            evt.target.value = "";
        }
    }
    if (data.channel === null){
        return <div>Channel doesn't exist</div>
    }
    return (
        <>
            {data && (
                <>
              
                    <h1>{data.channel.name  } </h1>
                    {data.channel.messages.length ? data.channel.messages.map(msg => (
                        <p key={msg.id}>{msg.text}</p>)) : "No messages"}
                    <br />
                    <br />
                </>
            )}
            <input
                type="text"
                placeholder="+ New message"
                onKeyUp={handleKeyUp}
            />
            {error && <div>ERROR: {error.message}</div>}
        </>
    )
}