import { Html, Head, Main, NextScript } from "next/document";
import Navbar from "@/components/Navbar";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-gradient-to-br from-white to-indigo-200 text-gray-800">
        <Navbar/>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
