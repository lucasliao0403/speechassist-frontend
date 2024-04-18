import Image from "next/image";
import { Inter } from "next/font/google";
import AudioRecorder from "@/components/AudioRecorder";
import {useState} from 'react'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {


  return (
    <div className="">
        <h1>React Media Recorder</h1>
        
        <div className="flex flex-row justify-center">
           <AudioRecorder />
        </div>
    </div>
  );
}
