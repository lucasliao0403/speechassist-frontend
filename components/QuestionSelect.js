

import React from 'react'
import { questionSet } from '@/assets/data'

export default function QuestionSelect({currentQuestionSetIndex, setCurrentQuestionSetIndex}) {
    console.log(currentQuestionSetIndex)
    return (
        <div className="flex flex-row gap-4 justify-left">
            {questionSet.map((questionGroup) => 
            <QuestionCard questionGroup = {questionGroup} 
            setCurrentQuestionSetIndex={setCurrentQuestionSetIndex} 
            currentQuestionSetIndex={currentQuestionSetIndex}/>
        )}
        </div>
    )
}

function QuestionCard({questionGroup, setCurrentQuestionSetIndex, currentQuestionSetIndex}) {
    let styles = "drop-shadow-md bg-blue-100 rounded-xl p-4 flex justify-center items-center hover:cursor-pointer hover:bg-blue-200 "
    if(questionGroup.index === currentQuestionSetIndex) {
        styles += " border-pink-400 border-solid border-4"
    }
    return (
        <div className="w-32 flex justify-center">
            <div onClick = {() => setCurrentQuestionSetIndex(questionGroup.index)}
            className={styles}> 
                <div> {questionGroup.title} </div>
            </div>
        </div>
    )
}