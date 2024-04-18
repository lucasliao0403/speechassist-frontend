import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import GPTResponse from './GPTResponse.js';
import {questionSet} from '@/assets/data.js'

function AudioTranscription({prompt, currentQuestionIndex, setCurrentQuestionIndex, currentQuestionSetIndex, setCurrentQuestionSetIndex}) {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');

  
  const mediaRecorderRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Reset transcription when question changes
    setTranscription('');
  }, [currentQuestionIndex, currentQuestionSetIndex]);


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

        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questionSet[currentQuestionSetIndex].questions.length);

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks);
          setAudioBlob(audioBlob);
          stream.getTracks().forEach(track => track.stop());
          // Move to the next question after stopping the recording
          
        };

        timeoutRef.current = setTimeout(() => {
          if (recording) {
            stopRecording();
          }
        }, 60000); // 1 minute
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
    axios.post('http://localhost:3000/transcribe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      setTranscription(response.data);
    })
    .catch(error => {
      setError('Error transcribing audio.');
      console.error(error);
    });
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>{questionSet[currentQuestionSetIndex].questions[currentQuestionIndex]}</h2>
      <button onClick={toggleRecording} style={{ backgroundColor: '#4CAF50', color: 'white', margin: '10px', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <button onClick={handleTranscribeAudio} disabled={!audioBlob || recording} style={{ backgroundColor: '#008CBA', color: 'white', margin: '10px', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
        Transcribe
      </button>
      <div>
        <h3>Transcription:</h3>
        <p>{transcription || 'No transcription available.'}</p>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </div>
      <GPTResponse transcript={transcription} prompt={questionSet[currentQuestionSetIndex].questions[currentQuestionIndex]}/>
    </div>
  );
}

export default AudioTranscription;
