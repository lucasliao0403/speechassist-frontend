import React, { useState, useRef } from 'react';
import axios from 'axios';

function AudioTranscription() {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');
  const mediaRecorderRef = useRef(null);  
  const timeoutRef = useRef(null);        

  const toggleRecording = () => {
    if (!recording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder; 
        mediaRecorder.start();
        setRecording(true);
        const audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks);
          setAudioBlob(audioBlob);
          stream.getTracks().forEach(track => track.stop());  
        };

        timeoutRef.current = setTimeout(() => {
          if (recording) {
            stopRecording();
          }
        }, 60000);  // 1 minute
      })
      .catch(e => {
        setError('Could not access microphone. Please ensure it is not in use by another application.');
        console.error(e);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();  
      clearTimeout(timeoutRef.current); 
      setRecording(false);
    }
  };

  const handleTranscribeAudio = () => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'userAudio.wav'); 
    console.log("handled transcribing")
    axios.post('http://localhost:3000/transcribe', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
    })
    .then(response => {
        console.log(response);
        setTranscription(response.data.text);
    })
    .catch(error => {
        setError('Error transcribing audio.');
        console.error(error);
    });
};


  return (
    <div>
      <button onClick={toggleRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <button onClick={handleTranscribeAudio} >
        Transcribe
      </button>
      <div>
        <h3>Transcription:</h3>
        <p>{transcription || 'No transcription available.'}</p>
        {error && <p>Error: {error}</p>}
      </div>
    </div>
  );
}

export default AudioTranscription;
