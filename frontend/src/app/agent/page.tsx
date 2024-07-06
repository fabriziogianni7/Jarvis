'use client'
import { useEffect, useState } from "react";


import GeneralChat from "../components/chat/GeneralChat";
import useBrian from "../hooks/useBrian";


export default function Stake() {
  const {data} = useBrian()
  useEffect(()=> console.log(data))


  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="w-full h-full">
      <GeneralChat />
       </div>
    </main >
  );
}
