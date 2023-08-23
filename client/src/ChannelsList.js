import { Link } from "react-router-dom";
import AddChannel from "./AddChannel";
import { CHANNEL_LISTS } from "./utils/queries";
import { useQuery } from "@apollo/client";

const ChannelsList = () => {
const {data, loading, error} = useQuery(CHANNEL_LISTS, {pollInterval: 5000 })

    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    } return (
      <div className="channelsList">
        <AddChannel /> 
        { data.channels.map( ch => 
          (
            <Link to={`/channels/${ch.id}`}>
          <div key={ch.id} className={'channel ' + (ch.id < 0 ? 'optimistic' : '')}>{ch.name}</div>
            </Link>
          )
        )}
      </div>
    );
  };
  
  export default ChannelsList;