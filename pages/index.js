import Image from "next/image";
import { Inter } from "next/font/google";
import AudioRecorder from "@/components/AudioRecorder";
import {useState, useRef} from 'react'
import Webcam from "react-webcam";
import AudioTranscription from '@/components/AudioTranscription'; 
import { questionSet } from "@/assets/data.js";
import QuestionSelect from "@/components/QuestionSelect";

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
        {pageNum==0 && <div className="text-black font-bold p-8 h-full flex flex-col justify-center align-center mt-16 mx-16">
            <h1 className="text-left text-6xl mb-2"> Welcome to <br/> <span className="text-pink-400">Interview Assistant!</span></h1>
            <h2 className="text-xl mb-16 font-normal"> Please select an interview problem set below.</h2>
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
          <div>
            {questionSet[currentQuestionSetIndex].questions[currentQuestionIndex]}
          </div>
          show avatar
          <div className="flex flex-row gap-4">
            <div className="flex justify-center text-white w-72 cursor-pointer rounded-xl text-center px-4 py-2 mt-4 bg-red-400 hover:bg-red-300" onClick = {() => setPageNum(0)}> Go back</div>
            
            <div className="flex justify-center text-white w-72 cursor-pointer rounded-xl text-center px-4 py-2 mt-4 bg-red-400 hover:bg-red-300" onClick = {() => setPageNum(2)}> Continue </div>
            </div>
          </div>}

          {pageNum==2 && 
        <div>
          <div>
            {questionSet[currentQuestionSetIndex].questions[currentQuestionIndex]}
          </div>
          show webcam / record here
          <div className="flex flex-row gap-4">      
            <div className="flex justify-center text-white w-72 cursor-pointer rounded-xl text-center px-4 py-2 mt-4 bg-red-400 hover:bg-red-300" onClick = {() => setPageNum(3)}> Continue </div>
            </div>
          </div>}
          
      </div>
      {pageNum == 3 && <div className="">
          {/* {console.log(currentQuestionIndex)} */}
          <AudioTranscription 
          currentQuestionIndex={currentQuestionIndex}
          currentQuestionSetIndex={currentQuestionSetIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          setCurrentQuestionSetIndex={setCurrentQuestionSetIndex}
          />       
            <div className="flex justify-center text-white w-72 cursor-pointer rounded-xl text-center px-4 py-2 mt-4 bg-red-400 hover:bg-red-300" onClick = {() => setPageNum(0)}> Finish </div>
        </div>
        
        }
        
        

    </div>
  );
}
