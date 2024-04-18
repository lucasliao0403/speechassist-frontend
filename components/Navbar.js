import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="h-[100px] flex flex-row justify-between items-center bg-blue-400 font-bold text-white text-2xl">
            <Link href="/" className="p-4 pl-16 flex justify-center items-center">
                Home
            </Link>
            <Link href="/about" className="p-4 pr-16 flex justify-center align-items">
                About
            </Link>
    </div>
  )
}

