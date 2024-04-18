import { useState } from 'react';
import axios from 'axios';

function GPTResponse({ transcript, prompt }) {
    const [GPTresponse, setGPTResponse] = useState('');
    const [error, setError] = useState('');

    const getGPT = () => {
        axios.post('http://localhost:3000/chatgpt', { transcript, prompt })
        .then(response => {
            console.log("GPT Response:", response.data);
            const textResponse = response.data.choices[0].message.content; // Adjust according to your response structure
            setGPTResponse(textResponse); // Adjust according to the actual structure of the response
        })
        .catch(err => {
            setError('Error fetching GPT response.');
            console.error(err);
        });
    };

    return (
        <div>
            <button onClick={getGPT} style={{
                backgroundColor: '#021CBA', color: 'white', margin: '10px', padding: '10px 20px',
                border: 'none', borderRadius: '5px'
            }}>
                Get Response
            </button>
            <div style={{ color: 'red' }}>{error}</div>
            <div>Response: {GPTresponse ? GPTresponse : 'No response yet.'}</div> 
        </div>
    );
}

export default GPTResponse;
