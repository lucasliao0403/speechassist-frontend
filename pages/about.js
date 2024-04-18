import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800">
      <div className="bg-white shadow-xl rounded-lg p-8 m-4 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-4">About Us</h1>
        <p className="text-xl text-center mb-8">
          Welcome to SpeechAssist, where we empower you to excel in your interviews through dedicated practice and real-time feedback.
        </p>
        <div className="flex flex-col md:flex-row justify-around items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold">The Team</h2>
            <ul className="list-disc pl-5">
              <li>Adam Wang - Program Developer</li>
              <li>Lucas Liao - Program Developer</li>
              <li>Conan Wang - Program Developer</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <p>Email: <a href="mailto:contact@speechassist.com" className="text-blue-500 hover:text-blue-600">contact@speechassist.com</a></p>
            <p>Website: <a href="https://www.speechassist.com" className="text-blue-500 hover:text-blue-600">www.speechassist.com</a></p>
          </div>
        </div>
        <div className="text-center mt-8">
        </div>
      </div>
    </div>
  );
}
