import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <div className="h-[100px] flex flex-row justify-between items-center font-bold text-slate-700 text-2xl">
            <Link href="/" className="p-4 pl-16 flex justify-center items-center p-2">
                  <div className="mr-2 font-bold text-3xl">SpeechAssist</div>
            </Link>
            <Link href="/about" className="p-4 pr-16 flex justify-center align-items">
                About
            </Link>
    </div>
  )
}

