import { wagmiConfig } from "@/app/config/WagmiConfig";
import { PHALA_CID, allowedChainids } from "@/app/config/generalConfig";
import { useEffect, useState } from "react";
import { formatUnits, parseEther } from "viem";
import { useAccount, useChainId, useClient, useEstimateGas, usePrepareTransactionRequest, useReadContracts, useSendTransaction } from "wagmi";
import { BrianResponse } from "./hookUtils";
import axios from "axios";
import { estimateGas } from "wagmi/actions";


type HookProps = {
  text: string
}

// // const PHALA_CID = "Qmef5oM4XSdXZHtPPW56b4rKj6TSrMpQPgeBP1pcUy7n3p"
// // const PHALA_CID = "QmWcWgGz59AByhQHYhy8nJUxvohNpASwaxjpovnxDK7gez" ok
// const PHALA_CID = "QmRBQ4pCtKEE5ZaDPQAbUFnevdbdctSnFLhjHg2pNQ4aBS"

export default function useSentiment({ text }: HookProps) {
  const [sentiment, setSentiment] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>()
  const [error, setError] = useState<string>("")


  const sendPrompt = async () => {
    setIsLoading(true)
    try {
       const sentimentResp :any= await axios.get(`https://agents.phala.network/ipfs/${PHALA_CID}/0?prompt=${text}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
       
      })
    if(sentimentResp?.data.error){
      setError(sentimentResp.data.error)
    }else if(sentimentResp?.data == null){
      setError("an error occurred")
    }
    else{
    setSentiment(sentimentResp.data)
    }
    setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
   
  }


  useEffect(() => {
    if (text) {
      sendPrompt()
    }
  }, [text])


  return { isLoading, error, sentiment }
}