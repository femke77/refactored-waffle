
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CHANNEL } from './utils/mutations';
import { CHANNEL_LISTS } from './utils/queries';

const AddChannel = () => {
    const [addChannel, {loading, error}] = useMutation(ADD_CHANNEL)
    
    const handleKeyUp = async (evt) => {
        if (evt.keyCode === 13) {
            await addChannel({
                variables: {name: evt.target.value},
                refetchQueries: [{query: CHANNEL_LISTS}]

            })
        }
    }; return (
        <input
            type="text"
            placeholder="New channel"
            onKeyUp={handleKeyUp}
        />
    );
};



export default AddChannel;