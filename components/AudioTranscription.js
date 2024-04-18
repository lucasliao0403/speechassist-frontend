import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import GPTResponse from './GPTResponse.js';
import {questionSet} from '@/assets/data.js'

function AudioTranscription({prompt, currentQuestionIndex, setCurrentQuestionIndex, currentQuestionSetIndex, setCurrentQuestionSetIndex, transcription}) {
  

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{questionSet[currentQuestionSetIndex].questions[currentQuestionIndex].text}</h2>
      
      
      <div>
        <h3 className="font-bold mb-1">Transcription</h3>
        {
          transcription?
          <div> 
            <div className=" border-gray-600 border-dashed border-4 p-4 rounded-xl drop-shadow-xl h-[150px] overflow-y-scroll">
              <p>{transcription}</p>
            </div>
        </div>:<></>
        }
       
        
      </div>
      <GPTResponse transcript={transcription} prompt={questionSet[currentQuestionSetIndex].questions[currentQuestionIndex].text}/>
    </div>
  );
}

export default AudioTranscription;
