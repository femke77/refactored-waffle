import React from 'react';
import {
    gql,
} from "@apollo/client";
import { useMutation } from '@apollo/client';
import { ADD_CHANNEL } from './utils/mutations';
const AddChannel = () => {

    const [addChannel, {data, loading, error}] = useMutation(ADD_CHANNEL)
    const handleKeyUp = async (evt) => {
        if (evt.keyCode === 13) {
            const {data} = await addChannel({
                variables: {name: evt.target.value}
            })
            evt.target.value = "";
      
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