'use client'
import { useEffect, useState } from "react";


import GeneralChat from "../components/chat/GeneralChat";
import { CreateJarvis } from "../components/create-jarvis/CreateJarvis";


export default function Stake() {

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="w-full h-full">
       <CreateJarvis/>
       </div>
    </main >
  );
}
