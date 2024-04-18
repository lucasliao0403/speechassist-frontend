
import {useState} from 'react';
import axios from 'axios'

function GPTResponse(transcript) {

    const [GPTresponse, setGPTResponse] = useState(null)
    const [error, setError] = useState('');

    const getGPT = (transcript) => {
        axios.post('http://localhost:3000/chatgpt',{
        headers: {}, 
        body: {
            data: {transcript}
        }
        })
        .then(response => {
            console.log("GPT Response:")
            console.log(response.data.choices[0].message.content);
            setGPTResponse(response.data.choices[0].message.content);
        })
        .catch(error => {
            setError('Error fetching GPT response.');
            console.error(error);
        });
        return 
    };


    return (
        <div className="text-red">
            Response:
            <button onClick={() => getGPT(transcript)}> get response </button>
            {GPTresponse ? {GPTresponse}:<></>}
        </div>
    );
}

export default GPTResponse;