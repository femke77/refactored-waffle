
import { useMutation } from '@apollo/client';
import { ADD_CHANNEL } from './utils/mutations';
import { CHANNEL_LISTS } from './utils/queries';

const AddChannel = () => {

    const [addChannel, { error }] = useMutation(ADD_CHANNEL)

    const handleKeyUp = async (evt) => {
        if (evt.keyCode === 13) {
            await addChannel({
                variables: { name: evt.target.value },
                optimisticResponse: {
                   addChannel: {
                    name: evt.target.value,
                    id: Math.round(Math.random()* -1000000),
                    __typename: 'Channel'
                   }
                },
                // refetchQueries: [{ query: CHANNEL_LISTS }]  ----OLD WAY!!!
                
                // NEW WAY ZERO LATENCY:
                update(cache, { data: { addChannel } }) {
                    try {
                      // First we retrieve existing channels data that is stored in the cache under the `CHANNELS_LIST` query
                      // Could potentially not exist yet, so wrap in a try/catch
                      const { channels } = cache.readQuery({ query: CHANNEL_LISTS });
              
                      // Then we update the cache by combining existing channels data with the newly created data returned from the mutation
                      cache.writeQuery({
                        query: CHANNEL_LISTS,
                        // If we want new data to show up before or after existing data, adjust the order of this array
                        data: { channels: [...channels, addChannel] },
                      });
                    } catch (e) {
                      console.error(e);
                    }
                  },
            })
            evt.target.value = "";
        }
    }; return (
        <>
            <input
                type="text"
                placeholder="+ New channel"
                onKeyUp={handleKeyUp}
            />
            {error && <div>{error.message}</div>}
        </>
    );
};



export default AddChannel;