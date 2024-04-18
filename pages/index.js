import Image from "next/image";
import { Inter } from "next/font/google";
import AudioRecorder from "@/components/AudioRecorder";
import {useState, useRef} from 'react'
import Webcam from "react-webcam";
import AudioTranscription from '@/components/AudioTranscription'; 

const inter = Inter({ subsets: ["latin"] });

const videoConstraints = {
  facingMode: "user"
};

export default function Home() {

  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);

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
    <div className="">
        {/* <h1>React Media Recorder</h1> */}

        <header className="App-header">
          <h1>Whisper Transcription Example</h1>
          <AudioTranscription />
        </header>

        {/* <div className="flex flex-row justify-center">
          <Webcam ref={webRef} videoConstraints={videoConstraints} />;
          {!permission ? (
              <button onClick={getCameraPermission} type="button">
                  Get Camera
              </button>
          ):null}
        </div> */}
    </div>
  );
}
