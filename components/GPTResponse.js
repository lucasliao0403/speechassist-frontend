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
            <div className="flex justify-center ">
                {!GPTresponse && <button onClick={getGPT} className="text-xl font-bold hover:bg-blue-600 bg-blue-700 text-white mt-4 px-8 py-4 rounded-xl">
                    Get Feedback!
                </button>}
            </div>
            <div style={{ color: 'red' }}>{error}</div>
            <div className="mt-4  border-gray-600 bg-slate-100 border-solid border-4 p-4 rounded-xl drop-shadow-xl h-[300px] overflow-y-scroll">
                { GPTresponse? {GPTresponse}: <div> Click the feedback button!</div>}
            </div>
            
        </div>
    );
}

export default GPTResponse;
