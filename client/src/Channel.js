import { useQuery } from "@apollo/client"
import { CHANNEL_DETAILS } from "./utils/queries"
import { useParams } from "react-router-dom"

export default function Channel() {

    const { id } = useParams()

    const { data, loading, error } = useQuery(CHANNEL_DETAILS, {
        variables: { channelId: id }
    })

    if (loading) return <div>Loading....</div>

    const handleKeyUp = async (evt) => {
        if (evt.keyCode === 13) {

        }
    }
    return (
        <>
            {data && (
                <>
                    <h1>{data.channel.name} Channel</h1>
                    {data.channel.messages.map(msg => `message: ${msg.text}`)}
                    <br />
                    <br />
                </>
            )}
            <input
                type="text"
                placeholder="+ New message"
                onKeyUp={handleKeyUp}
            />
            {error && <div>{error.message}</div>}
        </>
    )
}