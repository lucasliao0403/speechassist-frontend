import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import GPTResponse from './GPTResponse.js';
import {questionSet} from '@/assets/data.js'

function AudioTranscription({prompt, currentQuestionIndex, setCurrentQuestionIndex, currentQuestionSetIndex, setCurrentQuestionSetIndex}) {
  const [recording, setRecording] = useState(false);
  const audioBlobRef = useRef(null);
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
    console.log("start recording")
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
          audioBlobRef.current = audioBlob;
          stream.getTracks().forEach(track => track.stop());
          console.log(audioBlobRef.current)
          handleTranscribeAudio();
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
    console.log("stop recording")
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      clearTimeout(timeoutRef.current);
      setRecording(false);
    }
  };

  function handleTranscribeAudio() {
    console.log("transcribe audio")
    const formData = new FormData();
    formData.append('audio', audioBlobRef.current, 'userAudio.wav');
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
    <div className="p-4">
      <h2>{questionSet[currentQuestionSetIndex].questions[currentQuestionIndex]}</h2>
      <button onClick={toggleRecording} className="bg-red-400 text-white py-2 px-4 rounded-xl hover:bg-red-300">
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      
      <div>
        <h3>Transcription:</h3>
        <div className=" border-gray-600 bg-slate-100 border-solid border-4 p-4 rounded-xl drop-shadow-xl h-[200px] overflow-scroll">
          <p>{transcription || 'No transcription available.'}</p>
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
        
      </div>
      <GPTResponse transcript={transcription} prompt={questionSet[currentQuestionSetIndex].questions[currentQuestionIndex]}/>
    </div>
  );
}

export default AudioTranscription;
