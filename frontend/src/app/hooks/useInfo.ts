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


export default function useInfo({ text }: HookProps) {
  const [info, setInfo] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>()
  const [error, setError] = useState<string>("")


  const sendPrompt = async () => {
    setIsLoading(true)
    try {
       const predictionResp :any= await axios.get(`https://agents.phala.network/ipfs/${PHALA_CID}/0?prompt=${text}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
       
      })
    if(predictionResp?.data.error){
      setError(predictionResp.data.error)
    }else if(predictionResp?.data == null){
      setError("an error occurred")
    }
    else{
    setInfo(predictionResp.data)
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


  return { isLoading, error, info }
}