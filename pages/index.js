import Image from "next/image";
import { Inter } from "next/font/google";
import AudioRecorder from "@/components/AudioRecorder";
import {useState, useRef, useEffect} from 'react'
import Webcam from "react-webcam";
import AudioTranscription from '@/components/AudioTranscription'; 
import { questionSet } from "@/assets/data.js";
import QuestionSelect from "@/components/QuestionSelect";
import axios from 'axios'
import React from 'react'
// import vid from '@/assets/videos/uoft/uoftq1.mp4'

const inter = Inter({ subsets: ["latin"] });

const videoConstraints = {
  facingMode: "user"
};

export default function Home() {

  const [pageNum, setPageNum] = useState(0)

  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestionSetIndex, setCurrentQuestionSetIndex] = useState(0);

  const [recording, setRecording] = useState(false);
  const audioBlobRef = useRef(null);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');

  // const[videoPath, setVideoPath] = useState("@/assets/videos/uoft/uoftq1.mp4")
  
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


        // setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questionSet[currentQuestionSetIndex].questions.length);

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

  const getCameraPermission = async () => {
      if ("MediaRecorder" in window) {
          try {
              const streamData = await navigator.mediaDevices.getUserMedia({
                  audio: true,
                  video: true,
              });
              setPermission(true);
              setStream(streamData);
          } catch (err) {
              alert(err.message);
          }
      } else {
          alert("The MediaRecorder API is not supported in your browser.");
      }
  }

  const webRef = useRef(null)
  return (
    <div className="flex flex-row justify-center">
      <div className=" flex justify-center mt-8">
        {pageNum==0 && <div className="text-black font-bold p-8 h-full flex flex-col justify-center align-center mt-16 mx-16 max-w-[60vw]">
            <div className="flex flex-row gap-16"> 
              <div>
                <h1 className="text-left text-6xl mb-2"> Welcome to <br/> <span className="text-pink-400">SpeechAssist!</span></h1>
                <h2 className="text-xl mb-16 font-normal"> Please select an interview problem set below.</h2>
              </div>
              <div> 
                  <Image 
                  src={require("@/assets/logo.png")}
                  width={150}
                  height={150}
                  
                  />
              </div>
            </div>
            <QuestionSelect
            currentQuestionSetIndex={currentQuestionSetIndex}
            setCurrentQuestionSetIndex={setCurrentQuestionSetIndex}
            />
            <div className="flex justify-center w-full">
              <div className="flex justify-center text-white w-72 cursor-pointer rounded-xl text-center px-4 py-2 mt-8 bg-red-400 hover:bg-red-300" onClick = {() => setPageNum(1)}> Begin </div>
            </div>
            
          </div>}
        
        {pageNum==1 && 
        <div>
          <div className="max-w-[40vw] text-wrap text-xl font-bold m-2">
            {questionSet[currentQuestionSetIndex].questions[currentQuestionIndex].text}
          </div>
          <div>
            <video width="720" controls>
              <source src={'/videos/uoft/uoftq1.mp4'} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex justify-center text-white w-72 cursor-pointer rounded-xl text-center px-4 py-2 mt-4 bg-red-400 hover:bg-red-300" onClick = {() => setPageNum(0)}> Go back</div>
            
            <div className="flex justify-center text-white w-72 cursor-pointer rounded-xl text-center px-4 py-2 mt-4 bg-red-400 hover:bg-red-300" onClick = {() => setPageNum(2)}> Continue </div>
            </div>
          </div>}

          {pageNum==2 && 
        <div>
          <div className="max-w-[40vw] text-wrap text-xl font-bold m-2">
            {questionSet[currentQuestionSetIndex].questions[currentQuestionIndex].text}
          </div>
          <Webcam/>
          <button onClick={toggleRecording} className="bg-red-400 text-white py-2 px-4 rounded-xl hover:bg-red-300">
            {recording ? 'Stop Recording' : 'Start Recording'}
          </button>
          <div className="flex flex-row gap-4">      
            <div className="flex justify-center text-white w-72 cursor-pointer rounded-xl text-center px-4 py-2 mt-4 bg-red-400 hover:bg-red-300" onClick = {() => setPageNum(3)}> Continue </div>
            </div>
          </div>}
          
      </div>
      {pageNum == 3 && <div className="w-[80vw]">
          {/* {console.log(currentQuestionIndex)} */}
          <AudioTranscription 
          currentQuestionIndex={currentQuestionIndex}
          currentQuestionSetIndex={currentQuestionSetIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          setCurrentQuestionSetIndex={setCurrentQuestionSetIndex}
          transcription={transcription}
          />    
          <div className="flex justify-center">  
            <div className="flex justify-center text-white w-72 cursor-pointer rounded-xl text-center px-4 py-2 my-4 bg-red-400 hover:bg-red-300" onClick = {() => setPageNum(0)}> Finish </div> </div> 
        </div>
        
        }
        
        

    </div>
  );
}
