import Image from "next/image";
import { Inter } from "next/font/google";
import AudioRecorder from "@/components/AudioRecorder";
import {useState, useRef} from 'react'
import Webcam from "react-webcam";
import AudioTranscription from '@/components/AudioTranscription'; 
import { questionSet } from "@/assets/data.js";

const inter = Inter({ subsets: ["latin"] });

const videoConstraints = {
  facingMode: "user"
};

export default function Home() {

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
    <div className="flex flex-row">
      <div className="max-w-[40vw] flex justify-center items-center">
        <div className=" text-black font-bold p-8">
            <div>
              <h1 className="text-3xl"> Welcome to <span className="text-pink-400">Interview Assistant!</span></h1>
              <div className="flex flex-row">

              </div>
            </div>
        </div>
      </div>
        <div className="">
          {/* {console.log(currentQuestionIndex)} */}
          <AudioTranscription 
          currentQuestionIndex={currentQuestionIndex}
          currentQuestionSetIndex={currentQuestionSetIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          setCurrentQuestionSetIndex={setCurrentQuestionSetIndex}
          />
        </div>
        

    </div>
  );
}
